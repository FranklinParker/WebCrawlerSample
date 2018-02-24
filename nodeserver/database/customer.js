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

const getAllCustomers = async () => {
	try {
		const records = await Customer.findAll({order: sequelize.col('name')});
		const customers = [];
		records.forEach((customer) => {
			const custDbRec = customer.dataValues;
			customers.push({
				name: custDbRec.name,
				industryCode: custDbRec.industry_code,
				clientCode: custDbRec.client_code,
				geoCode: custDbRec.geo_code,

			});
		});

		return customers;
	} catch (e) {
		throw e;
	}
}


module.exports.customer = {
	getAllCustomers
}

/***
 * test an add
 *
 * @returns {Promise<void>}
 */
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

const testGetAll = async ()=>{
	const customers = await getAllCustomers();
	console.log('customers', customers);

}
//testGetAll();
//testAdd();