const Sequelize = require('sequelize');

const sequelize = require('./connectionPostGres').connection;
const Op = Sequelize.Op;

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

/**
 *
 * add new customer record
 *
 * @param customer
 * @returns {Promise<*|{}>}
 */

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
	console.log('new customer added');
	return newCust.dataValues;
}

const findByCustomerName = async (customerName) =>{
	const customer = await Customer.findAll({name: customerName});
	if(customer && customer[0]){
		return customer[0].dataValues;
	} else{
		return null;
	}

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
	getAllCustomers,
	findByCustomerName,
	addCustomer
}

