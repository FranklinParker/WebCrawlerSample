const customer = require('../nodeserver/database/customer').customer;
const excelParser = require('../service/parseExcell').excelParser;


const processFuncAssesment = async (client, file, sheetName)=> {
	 let functionalAssmentData = await excelParser
		.processExcelToJson(
			file,
			sheetName);
		console.log('functionalAssmentData',functionalAssmentData);
		console.log('functionalAssmentData.length',functionalAssmentData.length);
		const clientNew = await clientDB.insertClient(client, functionalAssmentData);
		console.log('created client', clientNew);

}


const processSimplification = async (client, file, sheetName)=> {
	let simplificationData = await excelParser
		.processExcelToJson(
			file,
			sheetName);
	console.log('simplification',simplificationData);
	console.log('simplificationData.length',simplificationData.length);
	//const clientNew = await clientDB.insertClient(client, functionalAssmentData);
	//console.log('created client', clientNew);

}




processFuncAssesment(

	{
		clientName: 'ORANGE',
		clientCode: 'ORANGE',
		industryCode: 'UNKNOWN'
	},
	'/Users/franklinparker/outputFiles/ORANGE Functional Assessment Internal.xlsx',
	'simplification',

);



//
// sapClientDB.insertSapClient({
// 	clientName: 'Test',
// 	clientCode: 'TEST',
// 	industryCode: 'MANU'
// }).then((data)=>{
// 	console.log('data', data);
// });