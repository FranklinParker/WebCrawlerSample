const Sequelize = require('sequelize');

const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;

// { id: 1,
// 	name: 'cust',
// 	c_code: 'c_code',
// 	geo: 'geo',
// 	description: 'desc',
// 	created_at: null,
// 	updated_at: null,
// 	industry_code: 'indus' }
const Customer = sequelize.define('customer', {
		//username: {type: Sequelize.STRING, unique: true},
	  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		name: {type: Sequelize.STRING, allowNull: false},
		industry_code: Sequelize.STRING,
		cust_code: Sequelize.STRING,
		geo_code: Sequelize.STRING,
		created_at: Sequelize.DATE,
		updated_at: Sequelize.DATE


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
		cust_code: customer.customerCode,
		geo_code: customer.geoCode,
		created_at: new Date(),
		updated_at: new Date()
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
				customerCode: custDbRec.customer_code,
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
			customerCode: 'TEST',
			geoCode: 'NE'
		});
	console.log('added', cust);
}

const testGetAll = async ()=>{
	const customers = await getAllCustomers();
	console.log('customers', customers);

}
//testGetAll();
testAdd();