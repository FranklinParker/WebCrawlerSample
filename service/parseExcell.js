var XLSX = require('xlsx');

/**
 * Parses an excel sheet returning a json object with key (column header) value ( all other rows)
 *
 *
 * @param file
 * @param sheetToSelect
 * @returns {Promise<void>}
 */
var processExcelToJson = async (file, sheetToSelect) => {
	return new Promise(function (resolve, reject) {
		var workbook = XLSX.readFile(file);
		console.log('sheetNameToSelect:' + sheetToSelect);
		var sheetNames = workbook.SheetNames;
		console.log('sheetNames', sheetNames);
		let sheetToParse = sheetNames.find((sheet) => sheet === sheetToSelect);
		if(!sheetToParse){
			sheetToParse = sheetNames[0];
		}
		console.log('sheetToPase:' +sheetToParse);
		var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetToParse]);
		resolve(xlData);

	});
};

var getExcelSheetNames = (file) => {
	return new Promise((resolve, reject) => {
		var workbook = XLSX.readFile(file);
		resolve(workbook.SheetNames);
	});
};


module.exports.excelParser = {
	processExcelToJson,
	getExcelSheetNames
};
