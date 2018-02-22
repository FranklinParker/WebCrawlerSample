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

const SapClient = sequelize.define('SapClient', {
	//username: {type: Sequelize.STRING, unique: true},
	clientName: Sequelize.STRING(50),
	clientCode: Sequelize.STRING(10),
	industryCode: Sequelize.STRING(10)

});
/**
 * Insert an SAP Client record
 *
 *
 * @param sapClient
 * @returns {Promise<any>}
 */
var insertSapClient = (sapClient) => {
	return sequelize.sync()
		.then(() => SapClient.create({
			clientName: sapClient.clientName,
			clientCode: sapClient.clientCode,
			industryCode: sapClient.industryCode


		})
			.then(sapClient => {
				//console.log(sapGlossary.toJSON());
				return sapClient;
			}, err => console.log(JSON.stringify(err, null, 2))));

}


const findSapClientCount = async () => {
	return SapGlossary.findAll(
		{
			attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count_id']]
		}).then((count) => {
			 if(!count || count.length<1){
			 	return 0;
			 }else {
				 return count[0].dataValues.count_id;
			 }
	});
}




module.exports.sapClientSqlDb = {
	findSapClientCount,
	insertSapClient
}


