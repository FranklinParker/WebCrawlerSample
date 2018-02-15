const express = require('express');
const router = express.Router();
const sapDB = require('../database/cloudant').sapGlossaryDB;

router.get('/getBySoftwareComponent/:softwareComponent', function (req, res) {
	const softwareComponent = req.params.softwareComponent;
	sapDB.findSapGlossaryBySoftwareComponent(softwareComponent,
		(err, result)=>{
		  if(err){
		  	console.log('getBySoftwareComponent err', err);
				res.status(200).json({
					status: 'failed',
					softwareComponent: softwareComponent,

				});

			}else{
		  	console.log('getBySoftwareComponent response ', result);
				res.status(200).json({
					status: 'success',
					softwareComponent: softwareComponent,

				});
			}


		});

});

module.exports = router;
