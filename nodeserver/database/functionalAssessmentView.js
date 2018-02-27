const Sequelize = require('sequelize');
const fs = require('fs');
const sequelize = require('./connectionPostGres').connection;


const saveOutFunctionalAssessmentToFile = (fileOut) => {
	sequelize.query(
		"select * from s4hana.customer c, s4hana.out_bm_func_assess out_fa where c.id = out_fa.customer_id"
		, {type: sequelize.QueryTypes.SELECT})
		.then((functionalAss) => {

			console.log("number records:" + functionalAss.length);
			fs.appendFile(fileOut, JSON.stringify(functionalAss,null,2), (err) => {
				if (err) throw err;
				console.log('The "data to append" was appended to file!');
			});


		});
}


saveOutFunctionalAssessmentToFile('/Users/franklinparker/jsonForWatson/customerFuncAssessment.json');