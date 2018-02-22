const clientDB = require('../database/loadClientsDataDb').sapClientSqlDb;
const excelParser = require('../service/parseExcell').excelParser;


const processFuncAssesmentClient = async (client, file, sheetName)=> {
	 let functionalAssmentData = await excelParser
		.processExcelToJson(
			'/Users/franklinparker/outputFiles/ORANGE Functional Assessment Internal.xlsx',
			'Core process Final Version');
		console.log('functionalAssmentData',functionalAssmentData);
		console.log('functionalAssmentData.length',functionalAssmentData.length);
		clientDB.insertClient(client, functionalAssmentData)
			.then((result)=> console.log(result));

}



processFuncAssesmentClient(
	{
		clientName: 'ORANGE',
		clientCode: 'ORANGE',
		industryCode: 'UNKNOWN'
	},
	'/Users/franklinparker/outputFiles/ORANGE Functional Assessment Internal.xlsx',
	'Core process Final Version',

);



//
// sapClientDB.insertSapClient({
// 	clientName: 'Test',
// 	clientCode: 'TEST',
// 	industryCode: 'MANU'
// }).then((data)=>{
// 	console.log('data', data);
// });