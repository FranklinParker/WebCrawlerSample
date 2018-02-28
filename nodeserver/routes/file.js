const express = require('express');
const customerDB = require('../database/customer').customer;
const outFuncAssessment = require('../database/OutFunctionalAssesment').functionalAssesment;
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './public/images'});
const mimeTypesExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.ms-excel'];

const excelSettings = require('../config/config').excelParse;
const excellparser = require('../services/excellParser').excellParser;

/**
 * parses an excel file
 *
 */

router.post('/parseExcel', upload.single('file'), function (req, res, next) {
	const sheetName = req.body.sheetName;
	const maxRows = excelSettings.maxRecords;
	excellparser.processExcelToJson(req.file.path, sheetName)
		.then((data) => {
				if(data.length>maxRows ){
					data = data.slice(0,maxRows);
				}

				res.send({message: `File Type ${req.file.mimetype} Parsed`, data: data});
			}, (err) => {
				console.log('err', err);
				res.send({message: 'failed '});
			}
		);
});


/**
 * parses an excel file
 *
 */

router.post('/upload', upload.single('file'), async (req, res, next) =>{
	const sheetName = req.body.sheetName;
	const customerId = req.body.customerId;
	try{
		const records = await excellparser.processExcelToJson(req.file.path, sheetName);
		const customer = await  customerDB.findById(customerId);
		records.forEach(async (rec) =>{
			rec.customer_id = customer.id;
			const res = await outFuncAssessment.addOutFunctionalAssessment(rec);
		});


		res.send({message: `File  uploaded`});

	}catch (e){
		console.log('e',e);

		res.send({message: 'Error uploading'});
	}


});



router.post('/getExcelSheets', upload.single('file'), function (req, res, next) {
	const mimeTypeExcel = mimeTypesExcel.find(mime => mime === req.file.mimetype);
	if (mimeTypeExcel) {
		excellparser.getExcelSheetNames(req.file.path)
			.then((sheetNames) => {
					res.send({
						message: `File Type ${req.file.mimetype} Sheet Names`,
						result: 'success',
						sheetNames: sheetNames
					});
				}, (err) => {
					console.log('err', err);
					res.send({message: 'failed ', result: 'success'});
				}
			);
	} else {
		res.send({message: `File Type ${req.file.mimetype} is not excel`, result: 'NotFound'});
	}
});


module.exports = router;