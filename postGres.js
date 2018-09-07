const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'url',
	dialect: 'postgres',
	port: 34751,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	// SQLite only
	//storage: 'path/to/database.sqlite',

	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
	operatorsAliases: false
});

const User = sequelize.define('user', {
	username: {type: Sequelize.STRING, unique: true},
	lastName: Sequelize.STRING
});

sequelize.sync()
	.then(() => User.create({
		username: 'hparker',
		firstName: 'Franklin',
		lastName: 'Parker'
	}))
	.then(jane => {
		console.log(jane.toJSON());
	}, err => console.log(JSON.stringify(err, null, 2)));