const Sequelize = require('sequelize');
const sequelize = new Sequelize('compose', 'admin', 'ARJKDCRVIPIGPLAG', {
	host: 'sl-us-south-1-portal.20.dblayer.com',
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

	// SQLite only
	//storage: 'path/to/database.sqlite',

	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
	operatorsAliases: false
});

const User = sequelize.define('user', {
	name: Sequelize.STRING
});

const createUser = async ()=>{
	try {
		const res = await sequelize.sync();
		const user = await User.create({
			name: 'jay',
		});
		console.log('create user', user);
	}catch (e){
		console.log(' error', e);''
	}
}
sequelize.query("select * from s4hana.out_bm_func_assess", { type: sequelize.QueryTypes.SELECT})
	.then(customers => {
		console.log(customers);
	})

//createUser();