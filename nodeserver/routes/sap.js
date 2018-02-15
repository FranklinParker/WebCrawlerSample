const express = require('express');
const router = express.Router();

router.get('/getBySoftwareComponent/:softwareComponent', function (req, res) {
	const softwareComponent = req.params.softwareComponent;
	res.status(200).json({
		status: 'success',
		softwareComponent: softwareComponent,

	});
});

module.exports = router;
