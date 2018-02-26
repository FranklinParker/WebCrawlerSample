const excelParser = require('../service/parseExcell').excelParser;
const customerDb = require('../nodeserver/database/customer').customer;



const loadOutFunctionalAssessment =  async (customer)=>{
	let customerFound = await customerDb.findByCustomerName(customer.name);
	console.log('found customer',customerFound);
	if(!customerFound){
		customer = await customerDb.addCustomer(customer);
		console.log('added customer ', customer);
	}
	// const cust = await addCustomer(
	// 	{
	// 		name: 'Test Delete',
	// 		industryCode: 'MANU',
	// 		customerCode: 'TEST',
	// 		geoCode: 'NE'
	// 	});

}

loadOutFunctionalAssessment({
	name: 'Customer',
	industryCode: 'NA',
	customerCode:'CUST',
	geoCode:'UK',

});
