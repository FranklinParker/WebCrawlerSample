var sapGlossDB;
var sapGlossFixedDB;
var sapGlossDupDB;
let sapGlossTestDB;


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


var insertSapGLossaryRecord = (record, callback) => {
	sapGlossDB.insert(record, record._id, function (error, doc) {
		if (error) {
			callback(error)

		} else {
			callback(null, doc);
		}
	});
}


var insertSapGLossaryRecordTest = (record, callback) => {
	sapGlossTestDB.insert(record, record._id, function (error, doc) {
		if (error) {
			callback(error)

		} else {
			callback(null, doc);
		}
	});
}

var initDBConnection = () => {
	let url = "removed"
	var cloudant = require('cloudant')(url);
	sapGlossDB = cloudant.use("sap_glossary");
	sapGlossFixedDB = cloudant.use('sap_glossary_fixed');
	sapGlossDupDB = cloudant.use('sap_glossary_duplicates');
	sapGlossTestDB = cloudant.use('sap_glossary_test');

}

/**
 *
 *
 *
 * @param callback
 */
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
/**
 *
 *
 *
 */
var findDuplicates = () => {
	findAllSapGlossary((err,result) => {
		let swComp = [];
		result.forEach((rec) => {
			if (rec.doc.softwareComponent) {
				let found = swComp.find((swComp) => rec.doc.softwareComponent === swComp._id);
				if (found) {
					found.count++;
					found.records.push(rec.doc);

				} else {
					swComp.push({
						_id: rec.doc.softwareComponent,
						count: 1,
						records: [rec.doc]
					});

				}
			}
		});

		sapGlossDupDB.bulk({
			docs: swComp
		}, function (er,res) {
			console.log(err);
			console.log('res', res);
		});
	});
}


//console.log('swComp dups:\n'+ JSON.stringify( swComp,null));


initDBConnection();
//findDuplicates();

module.exports.sapGlossaryDB = {
	insertSapGLossaryRecord,
	insertSapGLossaryRecordTest
}
