var sapGlossDB;


const findSapGlossaryBySoftwareComponent = (softwareComponent, callback) => {
	sapGlossDB.find({
			"selector": {
				"softwareComponent": {
					"$eq": softwareComponent
				}
			}//,
			//"use_index": ["_design/searchBySoftwareComponent"]
		}, function (error, doc) {
			if (error) {
				callback(error)

			} else {
				callback(null, doc);
			}
		});
}

const initDBConnection = () => {
	let url = "https://9b41eb1a-8a79-4ac7-a698-0377a25f0e2f-bluemix:6dd8b2a82fe7f54a1408132be22bd0f198e26f95eeaf3a7c20095972e9f23cd3@9b41eb1a-8a79-4ac7-a698-0377a25f0e2f-bluemix.cloudant.com"
	var cloudant = require('cloudant')(url);
	sapGlossDB = cloudant.use("sap_glossary");

}


initDBConnection();

module.exports.sapGlossaryDB = {
	findSapGlossaryBySoftwareComponent
}
