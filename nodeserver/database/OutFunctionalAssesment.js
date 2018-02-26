const Sequelize = require('sequelize');
const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;
/**
id: 1,
	customer_id: 1,
	process_group_l1: 'pg',
	module: 'm',
	process_scenario_l2: 'ps1',
	process_component_l3: 'ps2',
	process_component_l4: 'pc3',
	s4hana_impact: true,
	overview_change: 'f',
	change_impact_system_analysis: null,
	process_group: 'pg',
	impacted_tcode: 'tcode'
 **/
const OutFunctionAssessment = sequelize.define('OutFunctionAssessment', {
	//username: {type: Sequelize.STRING, unique: true},
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	customer_id: Sequelize.BIGINT,
	process_group_l1: Sequelize.STRING,
	module: Sequelize.STRING,
	process_scenario_l2: Sequelize.STRING,
	process_component_l3: Sequelize.STRING,
	process_component_l4: Sequelize.STRING,
	s4hana_impact: Sequelize.BOOLEAN,
	overview_change: Sequelize.TEXT,
	change_impact_system_analysis: Sequelize.STRING,
	process_group: Sequelize.STRING,
	impacted_tcode: Sequelize.STRING,

}, {
	// don't add the timestamp attributes (updatedAt, createdAt)
	timestamps: false,

		// define the table's name
		tableName: 'out_bm_func_assess'
}	);



const insertFunctionalAssessment = async  ( funcAssessment) => {
	const funcAsses =OutFunctionAssessment.create({
			customer_id: funcAssessment.customer_id,
			process_group_l1: funcAssessment.process_group_l1,
			module:  funcAssessment.module,
			process_scenario_l2:  funcAssessment.process_scenario_l2,
			process_component_l3: funcAssessment.process_component_l3,
			process_component_l4: funcAssessment.process_component_l4,
			s4hana_impact: funcAssessment.s4hana_impact,
			overview_change: funcAssessment.overview_change,
			change_impact_system_analysis:funcAssessment.change_impact_system_analysis,
			process_group: funcAssessment.process_group,
			impacted_tcode: funcAssessment.impacted_tcode

		}
	);
	return funcAsses;

}

const findFunctionalAssessmentCount = async () => {
	return OutFunctionAssessment.findAll(
		{
			attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count_id']]
		}).then((count) => {
		if (!count || count.length < 1) {
			return 0;
		} else {
			return count[0].dataValues.count_id;
		}
	});
}

const getAllFunctionalAssessments = async () => {
	return OutFunctionAssessment.findAll(
		{

		}).then((records) => {
			const functionalAssesments = [];
			records.forEach((record) => functionalAssesments.push(record.dataValues));
			return functionalAssesments;



	});
}

var getFunctAssessmentTableColumns = async () =>{
	const tableDesc = await FunctionAssesment.describe();
	const columns = Object.keys(tableDesc);
	return columns;

}


module.exports.functionalAssesment = {
	findFunctionalAssessmentCount,
	getAllFunctionalAssessments
}


const testGetAll = async ()=> {
	const records = await getAllFunctionalAssessments();
	console.log('records', records);
}

const testTableCols = async ()=>{
	const tableCols = await getFunctAssessmentTableColumns();
	console.log('cols', tableCols);

}


const testInsert = async ()=>{
	const record =  await insertFunctionalAssessment({
		customer_id: 1,
		process_group_l1: 'pgl1',
		module:  'mod',
		process_scenario_l2:  'ps1',
		process_component_l3: 'pc3',
		process_component_l4: 'pc4',
		s4hana_impact: false,
		overview_change: 'overview_change',
		change_impact_system_analysis:'change_impact_system_analysis',
		process_group: 'process_group',
		impacted_tcode: 'impacted_tcode'
	});
	console.log('record', record);

}

testInsert();

//testGetAll();

//testTableCols();