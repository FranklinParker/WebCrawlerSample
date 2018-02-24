const Sequelize = require('sequelize');

const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;


const SapGlossary = sequelize.define('SapGlossary', {
	//username: {type: Sequelize.STRING, unique: true},
	term: Sequelize.STRING,
	softwareComponent: Sequelize.STRING,
	termHeader: Sequelize.STRING,
	text: Sequelize.TEXT,
	url: Sequelize.STRING

});

const findSapGlossariesByStartLimit = async (startPos, number) => {
	return SapGlossary.findAll(
		{
			attributes: ['id', 'termHeader', 'term', 'url', 'softwareComponent', 'text', 'updatedAt'],
			offset: startPos, limit: number,
			order: sequelize.col('term')
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	});
}


const findSapGlossariesBySoftwareComponent = (softwareComponent) => {

	return SapGlossary.findAll(
		{
			where: {
				softwareComponent: softwareComponent

			}
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	}, err => console.log(err));
}

/**
 * find where term like
 *
 * @param term
 */
const findByTextLike = (text) => {
	return SapGlossary.findAll(
		{
			where: {
				text: {
					[Op.like]: text
				}
			},
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	}, err => console.log(err));
}
/***
 * find where text is blank
 *
 */

const findWhereTextBlank = () => {
	return SapGlossary.findAll(
		{
			where: {
				text: {
					[Op.eq]: ''
				},
			}
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	}, err => console.log(err));
}

/***
 * find where text is blank
 *
 */

const findByTermLike = (term) => {
	return SapGlossary.findAll(
		{
			where: {
				term: {
					[Op.like]: term +'%'
				},
			}
		}).then((records) => {
		let sapGlossaries = [];
		records.forEach((record) => {
			sapGlossaries.push(record.dataValues);
		});
		return sapGlossaries;
	}, err => console.log(err));
}

const findSapGlossaryRecordCount = async () => {
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

module.exports.sapGlossarySqlDb = {
	findSapGlossariesByStartLimit,
	findSapGlossariesBySoftwareComponent,
	findByTextLike,
	findByTermLike,
	findWhereTextBlank,
	findSapGlossaryRecordCount
}