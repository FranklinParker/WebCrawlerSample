var sapGlossDB;
var sapGlossFixedDB;

const findById = (id, callback) => {
	sapGlossFixedDB.get(id, (err, result) => {
		callback(err,result);
	});
}

const findSapGlossaryBySoftwareComponent = (softwareComponent, callback) => {
	sapGlossDB.find({
		"selector": {
			"softwareComponent": {
				"$eq": softwareComponent
			}
		},
		"use_index": ["_design/searchBySoftwareComponent/softwareComponent"]
	}, function (error, doc) {
		if (error) {
			callback(error)

		} else {
			callback(null, doc);
		}
	});
}

const findAllSapGlossary = (callback) => {
	sapGlossDB.list({include_docs: true},
		function (error, doc) {
			if (error) {
				callback(error);

			} else {
				console.log('docs', doc.rows[0]);
				callback(null, doc.rows);
			}
		});
}


var insertSapGlossaryRecord = (record, callback) => {
	sapGlossFixedDB.insert(record, function (error, doc) {
		if (error) {
			callback(error)

		} else {
			callback(null, doc);
		}
	});
}

const initDBConnection = () => {
	let url = "removed"
	var cloudant = require('cloudant')(url);
	sapGlossDB = cloudant.use("sap_glossary");
	sapGlossFixedDB = cloudant.use('sap_glossary_fixed');

}


initDBConnection();

module.exports.sapGlossaryDB = {
	findSapGlossaryBySoftwareComponent,
	findAllSapGlossary,
	insertSapGlossaryRecord,
	findById

}
