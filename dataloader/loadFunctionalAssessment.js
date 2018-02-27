const excelParser = require('../service/parseExcell').excelParser;
const customerDb = require('../nodeserver/database/customer').customer;
const outFunctionalAssessmentDb = require('../nodeserver/database/OutFunctionalAssesment').functionalAssesment;


const loadOutFunctionalAssessment = async (customer, file, sheet) => {

	try {

		let customerFound = await customerDb.findByCustomerName(customer.name);
		console.log('found customer', customerFound);
		if (!customerFound) {
			customerFound = await customerDb.addCustomer(customer);
			console.log('added customer ', customer);
		}
		const excelRecords = await excelParser.processExcelToJson(file, sheet);
		excelRecords.forEach(async (funcAssesRec)=> {
			funcAssesRec.customer_id = customerFound.id;
			const result = await outFunctionalAssessmentDb.addOutFunctionalAssessment(funcAssesRec);
		});

	}catch (e){
		console.log('err',e);
	}

}

loadOutFunctionalAssessment({
		name: 'Rede Records',
		industryCode: 'NA',
		customerCode: 'REDE_REC',
		geoCode: 'UK',

	},
	'/Users/franklinparker/outputFiles/Rede Records Functional Assessment Internal.xlsx',
	'Core process Final Version',
);
