const Sequelize = require('sequelize');
const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;


const FunctionAssesment = sequelize.define('FunctionAssesment', {
	//username: {type: Sequelize.STRING, unique: true},
	clientId: Sequelize.BIGINT,
	ProcesGroupL1: Sequelize.STRING(400),
	Module: Sequelize.STRING(400),
	ProcessScenarioL2: Sequelize.STRING(400),
	ProcessComponentL3: Sequelize.STRING(400),
	ProcessComponentL4: Sequelize.STRING(400),
	ProcessComponentL5: Sequelize.STRING(400),
	MandatoryProcess: Sequelize.STRING(400),
	S4HANAImpact: Sequelize.STRING(400),
	DefaultStatus: Sequelize.STRING(400),
	QueryID: Sequelize.STRING(400),
	RuleSet: Sequelize.STRING(400),
	FinalStatus: Sequelize.STRING(400),
	OverviewChangeSAPS4HANA: Sequelize.STRING(400),
	ChangeImpactBasedOnSystemAnalysis: Sequelize.STRING(400),
	ProcessGroup: Sequelize.STRING(400),
	ImpactedTCode: Sequelize.STRING(400),
	Observation: Sequelize.STRING(400)

}	);



const insertFunctionalAssesement = async  (clientId, funcAssesment) => {
	const funcAsses =FunctionAssesment.create({
			clientId: clientId,
			ProcesGroupL1: funcAssesment['Process Group L1'],
			Module: funcAssesment.Module,
			ProcessScenarioL2: funcAssesment['Process Scenario L2'],
			ProcessComponentL3: funcAssesment['Process Component L3'],
			ProcessComponentL4: funcAssesment['Process Component L4'],
			ProcessComponentL5: funcAssesment['Process Component L5'],
			MandatoryProcess: funcAssesment['Mandatory Process'],
			S4HANAImpact: funcAssesment['S/4HANA Impact'],
			DefaultStatus: funcAssesment['Default Status'],
			QueryID: funcAssesment['Query ID'],
			RuleSet: funcAssesment['Rule Set'],
			FinalStatus: funcAssesment['Final Status'],
			OverviewChangeSAPS4HANA: funcAssesment['Overview of the Change in SAP S/4HANA'],
			ChangeImpactBasedOnSystemAnalysis: funcAssesment['Change Impact based on System Analysis'],
			ProcessGroup: funcAssesment['Process Group'],
			ImpactedTCode: funcAssesment['Impacted TCode'],
			Observation: funcAssesment['Observation']
		}
	);
	return funcAsses;

}

const findFunctionalAssesmentCount = async () => {
	return FunctionAssesment.findAll(
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

const getAllFunctionalAssesments = async () => {
	return FunctionAssesment.findAll(
		{

		}).then((records) => {
			const functionalAssesments = [];
			records.forEach((record) => functionalAssesments.push(record.dataValues));
			return functionalAssesments;



	});
}

var getFunctAssementTableColumns = async () =>{
	const tableDesc = await FunctionAssesment.describe();
	const columns = Object.keys(tableDesc);
	return columns;

}


module.exports.functionalAssesment = {
	findFunctionalAssesmentCount,
	getAllFunctionalAssesments
}


const testGetAll = async ()=> {
	const records = await getAllFunctionalAssesments();
	console.log('records', records);
}

const testTableCols = async ()=>{
	const tableCols = await getFunctAssementTableColumns();
	console.log('cols', tableCols);

}


//testGetAll();

//testTableCols();
