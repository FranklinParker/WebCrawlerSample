const Sequelize = require('sequelize');
const fs = require('fs');
const sequelize = require('../nodeserver/database/connectionPostGres').connection;


const saveOutFunctionalAssessmentToFile = (fileOut) => {
	sequelize.query(
		"select * from s4hana.customer c, s4hana.out_bm_func_assess out_fa where " +
		" c.id = out_fa.customer_id " //and c.id in (1,2,3)"
		, {type: sequelize.QueryTypes.SELECT})
		.then((functionalAss) => {

			functionalAss.forEach((record) => {
				fs.appendFile(fileOut + record.id + '.json', JSON.stringify(record, null, 2), (err) => {
					if (err) throw err;
					//console.log('The "data to append" was appended to file!');
				});

			});
			console.log("number records:" + functionalAss.length);



		});
}


saveOutFunctionalAssessmentToFile('/Users/franklinparker/jsonForWatson/funcAssessRecordId');