const Sequelize = require('sequelize');

const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;


const Customer = sequelize.define('customer', {
		//username: {type: Sequelize.STRING, unique: true},
		name: {type: Sequelize.STRING, allowNull: false},
		industry_code: Sequelize.STRING,
	  client_code: Sequelize.STRING,
		geo_code: Sequelize.STRING

	}, {
		// don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,

		// define the table's name
		tableName: 'customer'
	}
);


const addCustomer = async (customer) => {
	const init = await  sequelize.sync();
	const newCust = await Customer.create({
		name: customer.name,
		industry_code: customer.industryCode,
		client_code: customer.clientCode,
		geo_code: customer.geoCode,
	});
	console.log('new customer');
	return newCust.dataValues;
}

const testAdd = async () => {
	const cust = await addCustomer(
		{
			name: 'Test Delete',
			industryCode: 'MANU',
			clientCode: 'TEST',
			geoCode: 'NE'
		});
	console.log('added', cust);
}

testAdd();