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



router.get('/getAll', function (req, res) {
	req.setTimeout(40000);
	sapDB.findAllSapGlossary(
		(err, result) => {
			if (err) {
				console.log('getAll err', err);
				res.status(200).json({
					status: 'failed'

				});

			} else {
				//console.log('getAll response ', result[0]);
				let swComp = [];
				result.forEach((rec) => {

					if (rec.doc.softwareComponent) {
						let found = swComp.find((swComp) => rec.doc.softwareComponent === swComp.softwareComponent);
						if (found) {
							found.count++;

						} else {
							swComp.push({
								softwareComponent: rec.doc.softwareComponent,
								count: 1
							});
							let newRecord = {
								_id: rec.doc.softwareComponent,
								softwareComponent: rec.doc.softwareComponent,
								text: rec.doc.text,
								url: rec.doc.url,
								term: rec.doc.term
							};
							sapDB.insertSapGlossaryRecord(newRecord,(err, result)=>{
								console.log('insert new', result);
							});


						}
					}
				});
				//console.log('swComp dups:\n'+ JSON.stringify( swComp,null));
				res.status(200).json({
					status: 'success'
				});
			}
		});

});

module.exports = router;
