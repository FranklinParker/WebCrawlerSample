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

const SapGlossary = sequelize.define('SapGlossary', {
	//username: {type: Sequelize.STRING, unique: true},
	term: Sequelize.STRING,
	softwareComponent: Sequelize.STRING,
	termHeader: Sequelize.STRING,
	text: Sequelize.TEXT,
	url: Sequelize.STRING

});
/**
 * Insert an SAP Glossary record
 *
 *
 * @param sapGloss
 * @returns {Promise<any>}
 */
var insertSapGlossary = (sapGloss) => {
	return sequelize.sync()
		.then(() => SapGlossary.create({
			url: sapGloss.url,
			termHeader: sapGloss.termHeader,
			term: sapGloss.term,
			softwareComponent: sapGloss.softwareComponent,
			text: sapGloss.text

		})
			.then(sapGlossary => {
				//console.log(sapGlossary.toJSON());
				return sapGlossary;
			}, err => console.log(JSON.stringify(err, null, 2))));

}

const findSapGlossaryRange = (startPos, number) => {
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
}

module.exports.sapGlossarySqlDb = {
	insertSapGlossary,
	findSapGlossaryRange
}

