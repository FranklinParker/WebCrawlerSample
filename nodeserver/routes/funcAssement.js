const express = require('express');
const router = express.Router();
const funcAssesment = require('../database/OutFunctionalAssesment').functionalAssesment;

router.get('/getAll', async (req, res) => {
	try {
		const funcAssessRecords  = await funcAssesment.getAllFunctionalAssessments();
		res.status(200).json({
			status: 'success',
			records: funcAssessRecords

		});
	} catch (e) {
		res.status(200).json({
			status: 'error',
			message: 'error getting function asses'

		});

	}

});


module.exports = router;
