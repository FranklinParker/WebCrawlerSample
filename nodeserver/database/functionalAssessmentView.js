const Sequelize = require('sequelize');
const sequelize = require('./connectionPostGres').connection;


const saveOutFunctionalAssessmentToFile = (fileOut) => {
	sequelize.query("select * from s4hana.customer c, s4hana.out_bm_func_assess out_fa where c.id = out_fa.customer_id LIMIT 20"
		, {type: sequelize.QueryTypes.SELECT})
		.then((functionalAss) => {
			console.log(functionalAss);


		});
}


saveOutFunctionalAssessmentToFile('');