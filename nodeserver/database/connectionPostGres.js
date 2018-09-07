const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'url',
	dialect: 'postgres',
	port: 34751,
	schema: 's4hana',
	logging: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});

module.exports.connection = sequelize;