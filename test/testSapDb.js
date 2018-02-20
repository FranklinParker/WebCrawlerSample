const sapGlossarySqlDb  = require('../database/sapGlossSql').sapGlossarySqlDb;

// sapGlossarySqlDb.findSapGlossaryRange(50,5)
// 	.then((records)=>{
// 		console.log('found sapGlossary:' , records);
// 		console.log('counts:' + records.length);
//
// 	});
const runDemo = async ()=>
{
	const count = await sapGlossarySqlDb.findSapGlossaryRecordCount();

	console.log('count:' + count);
	const records =  await sapGlossarySqlDb.findSapGlossaryRange(0,10);
	console.log('records', records);
}

runDemo();

