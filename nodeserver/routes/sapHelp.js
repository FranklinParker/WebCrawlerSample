const express = require('express');
const router = express.Router();
const sapSqlDB = require('../database/sapGlossSql').sapGlossarySqlDb;
const sapHelpSearch = require('../services/sapHelpSearch').sapHelpSearch;

router.get('/findHelpBy/:search', async (req, res)=> {
	const search = req.params.search;
	console.log('search:', search);
	try {
		const searchData = await sapHelpSearch.searchSapHelpBy(search);
		res.status(200).json({
			status: 'success',
			searchData: searchData,
			searchTerm: search

		});
	}catch(e) {
		console.log('error in sap Help search ', e);
		res.status(200).json({
			status: 'failed',
			error:'error' ,

		});
	}
});




module.exports = router;
