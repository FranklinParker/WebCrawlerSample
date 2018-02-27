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


router.get('/getByCustomer/:customerId', async (req, res) => {
	const customerId = req.params.customerId;
	try {
		const funcAssessRecords  = await funcAssesment.getFunctionalAssessmentsByCustomer(customerId);
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
