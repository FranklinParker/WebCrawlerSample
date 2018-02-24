const express = require('express');
const router = express.Router();
const customer = require('../database/customer').customer;

router.get('/getAll', async (req, res) => {
	try {
		const customers = await customer.getAllCustomers();
		res.status(200).json({
			status: 'success',
			records: customers

		});
	} catch (e) {
		res.status(200).json({
			status: 'error',
			message: 'error getting customers'

		});

	}

});


module.exports = router;
