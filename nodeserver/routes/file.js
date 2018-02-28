var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs');
const upload = multer({dest: '../public/images'});
const mimeTypesExcel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.ms-excel'];

const excelSettings = require('../config/config').excelParse;
const parser = require('../services/parser').parsers;

/**
 * parses an excel file
 *
 */

router.post('/parseExcel', upload.single('file'), function (req, res, next) {
	console.log('req.file', req.file);
	const sheetName = req.body.sheetName;
	const maxRows = excelSettings.maxRecords;
	parser.processExcelToJson(req.file.path, sheetName)
		.then((data) => {
				if(data.length>maxRows ){
					data = data.slice(0,maxRows);
					console.log('sliced:',  data);
				}

				res.send({message: `File Type ${req.file.mimetype} Parsed`, data: data});
			}, (err) => {
				console.log('err', err);
				res.send({message: 'failed '});
			}
		);
});


router.post('/getExcelSheets', upload.single('file'), function (req, res, next) {
	const mimeTypeExcel = mimeTypesExcel.find(mime => mime === req.file.mimetype);
	if (mimeTypeExcel) {
		parser.getExcelSheetNames(req.file.path)
			.then((sheetNames) => {
					console.log('found sheetNames', sheetNames);
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