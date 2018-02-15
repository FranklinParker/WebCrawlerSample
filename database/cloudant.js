var sapGlossDB;


var testQuery = (callback) => {
	sapGlossDB.find({
			"selector": {
				"_id": {
					"$eq": 'test'
				}
			}

		},

		function (error, result) {
			if (error) {
				callback(error);
			} else {
				if (result.docs.length > 0) {
					var sapGlossRecord = result.docs[0];
					callback(null, sapGlossRecord);
				} else {
					callback('RECORD_NOT_FOUND');
				}
			}
		}
	);
}


var insertSapGLossaryRecord= (record, callback)=>{
	sapGlossDB.insert(record, record._id, function(error, doc) {
		if(error) {
			callback(error)

		} else {
			callback(null, doc);
		}
	});
}

var  initDBConnection = ()=> {
	let url = "https://9b41eb1a-8a79-4ac7-a698-0377a25f0e2f-bluemix:6dd8b2a82fe7f54a1408132be22bd0f198e26f95eeaf3a7c20095972e9f23cd3@9b41eb1a-8a79-4ac7-a698-0377a25f0e2f-bluemix.cloudant.com"
	var cloudant = require('cloudant')(url);
	sapGlossDB = cloudant.use("sap_glossary");
	testQuery((error,result) => {
		console.log('query result', result);
	});
	insertSapGLossaryRecord({
		  "_id": 'Second_test',
			"term": "Demand Data Foundation ",
			"softwareComponent": "CA-DDF",
			"text": "A company that supplies other companies with data.This could be either a retailer or a third-party company collecting data\r\n from different data origins and possibly executing data cleansing and enrichment services."
		},
		(error, result)=>{
			console.log('result of insert:', result);
		});
}




initDBConnection();

module.exports.sapGlossaryDB = {
	insertSapGLossaryRecord
}
