const {sapGlossarySqlDb } = require('../database/sapGlossSql');

sapGlossarySqlDb.findSapGlossaryRange(50,5)
	.then((records)=>{
		console.log('found sapGlossary:' , records);
		console.log('counts:' + records.length);

	});
