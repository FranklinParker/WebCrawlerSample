const Sequelize = require('sequelize');
const sequelize = new Sequelize('compose', 'admin', 'ARJKDCRVIPIGPLAG', {
	host: 'sl-us-south-1-portal.20.dblayer.com',
	dialect: 'postgres',
	port: 34751,
	//logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});

const SapGlossary = sequelize.define('SapGlossary', {
	//username: {type: Sequelize.STRING, unique: true},
	name: Sequelize.STRING,
	term: Sequelize.STRING,
	softwareComponent: Sequelize.STRING,
	text: Sequelize.TEXT,
	url: Sequelize.STRING

});

const findSapGlossariesByStartLimit = (startPos, number) => {
	return SapGlossary.findAll(
		{
			attributes: ['id', 'name', 'term', 'url', 'softwareComponent', 'text', 'updatedAt'],
			offset: startPos, limit: number,
			order: sequelize.col('id')
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	});
	//{offset: startPos, limit: number});
}

module.exports.sapGlossarySqlDb = {
	findSapGlossariesByStartLimit
}

