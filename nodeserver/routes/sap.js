const express = require('express');
const router = express.Router();
const sapDB = require('../database/cloudant').sapGlossaryDB;
const sapSqlDB = require('../database/sapGlossSql').sapGlossarySqlDb;

router.get('/getById/:id', function (req, res) {
	const id = req.params.id;
	console.log('id:', id);
	sapDB.findById(id,
		(err, doc) => {
			if (err) {
				console.log('getById err', err);
				res.status(200).json({
					status: 'failed',
					error:'error' ,

				});

			} else {
				res.status(200).json({
					status: 'success',
					doc: doc

				});
			}
		});

});


router.get('/findByOffsetAndNumberRecords/:offset/:number', function (req, res) {
	const offset = req.params.offset;
	const number = req.params.number;
	console.log('offset:'+ offset+':number' + number);

	sapSqlDB.findSapGlossariesByStartLimit(offset, number)
		.then((records)=> {
			res.status(200).json({
				status: 'success',
				records: records
			});
		},(err)=>{
			console.log('err', err);
			res.status(200).json({
				status: 'failed'
			});

		});
});
/**
 *
 *
 *
 */

router.get('/findByTermLike/:term', function (req, res) {
	const term = req.params.term;
	console.log('term:'+ term);

	sapSqlDB.findByTermLike(term)
		.then((records)=> {
			res.status(200).json({
				status: 'success',
				records: records
			});
		},(err)=>{
			console.log('err', err);
			res.status(200).json({
				status: 'failed'
			});

		});
});

router.get('/findBySoftwareComponent/:softwareComponent', function (req, res) {
	const softwareComponent = req.params.softwareComponent;
	console.log('softwareComponent:'+ softwareComponent);

	sapSqlDB.findSapGlossariesBySoftwareComponent(softwareComponent)
		.then((records)=> {
			res.status(200).json({
				status: 'success',
				records: records
			});
		},(err)=>{
			console.log('err', err);
			res.status(200).json({
				status: 'failed'
			});

		});
});

router.get('/findWhereTextBlank', function (req, res) {

	sapSqlDB.findWhereTextBlank()
		.then((records)=> {
			res.status(200).json({
				status: 'success',
				records: records
			});
		},(err)=>{
			console.log('err', err);
			res.status(200).json({
				status: 'failed'
			});

		});
});


module.exports = router;
