const Sequelize = require('sequelize');

const sequelize = new Sequelize('compose', 'admin', 'ARJKDCRVIPIGPLAG', {
	host: 'sl-us-south-1-portal.20.dblayer.com',
	dialect: 'postgres',
	port: 34751,
	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});

const Op = Sequelize.Op;

const Client = sequelize.define('Client', {
	//username: {type: Sequelize.STRING, unique: true},
	clientName: Sequelize.STRING(50),
	clientCode: Sequelize.STRING(10),
	industryCode: Sequelize.STRING(10)

});

const FunctionAssesment = sequelize.define('FunctionAssesment', {
	//username: {type: Sequelize.STRING, unique: true},
	clientId: Sequelize.BIGINT,
	ProcesGroupL1: Sequelize.STRING(100),
	Module: Sequelize.STRING(100),
	ProcessScenarioL2: Sequelize.STRING(100),
	ProcessComponentL3: Sequelize.STRING(100),
	ProcessComponentL4: Sequelize.STRING(100),
	ProcessComponentL5: Sequelize.STRING(100),
	MandatoryProcess: Sequelize.STRING(10),
	S4HANAImpact: Sequelize.STRING(10),
	DefaultStatus: Sequelize.STRING(10),
	QueryID: Sequelize.STRING(15),
	RuleSet: Sequelize.STRING(20),
	FinalStatus: Sequelize.STRING(10),
	OverviewChangeSAPS4HANA: Sequelize.STRING(100),
	ChangeImpactBasedOnSystemAnalysis: Sequelize.STRING(30),
	ProcessGroup: Sequelize.STRING(10),
	ImpactedTCode: Sequelize.STRING(10),
	Observation: Sequelize.STRING(50)

});
/**
 { ID: '101',
	 'Process Group L1': 'Forecast to Produce',
	 Module: 'Production Planning',
	 'Process Scenario L2': 'PP -Manufacturing Execution',
	 'Process  Component L3': 'Discrete Manufacturing',
	 'Process Component L4': 'Create/Change production order',
	 'Process Component L5': 'CO01, CO40, CO41',
	 'Mandatory Process': 'No',
	 'S/4HANA Impact': 'Yes',
	 'Default Status': 'C3M',
	 'Query ID': 'PP-MAND-08',
	 'Rule Set': 'QUERY',
	 'Final Status': 'C2',
	 'Overview of the Change in SAP S/4HANA': '',
	 'Change Impact based on System Analysis': 'Minor Impact',
	 'Process Group': '',
	 'Impacted TCode': '',
	 Observation: '' },
 */
/**
 * Insert an SAP Client record
 *
 *
 * @param sapClient
 * @returns {Promise<any>}
 */
var insertClient = async (client, records) => {
	return sequelize.sync()
		.then(() => Client.create({
			clientName: client.clientName,
			clientCode: client.clientCode,
			industryCode: client.industryCode
		})
			.then(client => {
				//console.log(sapGlossary.toJSON());
				const funcAss = await insertFunctionalAssesement(client.id, records[0]);
				return client;
			}, err => console.log(JSON.stringify(err, null, 2))));

}


const insertFunctionalAssesement = async (clientId, funcAssesment) => {
	 const funcAsses= await FunctionAssesment.create({
			clientId: clientId,
			ProcesGroupL1: funcAssesment['Process Group L1'],
			Module: funcAssesment.Module,
			ProcessScenarioL2: funcAssesment['Process Scenario L2'],
			ProcessComponentL3: funcAssesment['Process  Component L3'],
			ProcessComponentL4: funcAssesment['Process  Component L4'],
			ProcessComponentL5: funcAssesment['Process  Component L5'],
			MandatoryProcess: funcAssesment['Mandatory Process'],
			S4HANAImpact: funcAssesment['S/4HANA Impact'],
			DefaultStatus: funcAssesment['Default Status'],
			QueryID: funcAssesment['Query ID'],
			RuleSet: funcAssesment['Rule Set'],
			FinalStatus: funcAssesment['Final Status'],
			OverviewChangeSAPS4HANA: funcAssesment['Overview of the Change in SAP S/4HANA'],
			ChangeImpactBasedOnSysAnalysis: funcAssesment['Change Impact based on System Analysis'],
			ProcessGroup: funcAssesment['Process Group'],
			ImpactedTCode: funcAssesment['Impacted TCode'],
			Observation: funcAssesment['Observation']
		}
	);
	 return funcAsses;

}

const findClientCount = async () => {
	return Client.findAll(
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


module.exports.sapClientSqlDb = {
	findClientCount,
	insertClient
}


