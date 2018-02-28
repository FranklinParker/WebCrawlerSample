var XLSX = require('xlsx');


var processExcelToJson = async (file, sheetToSelect) => {
	return new Promise(function (resolve, reject) {
		var workbook = XLSX.readFile(file);
		var sheetNames = workbook.SheetNames;
		let sheetToParse = sheetNames.find((sheet) => sheet === sheetToSelect);
		if(!sheetToParse){
			sheetToParse = sheetNames[0];
		}
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


module.exports.excellParser = {
	processExcelToJson,
	getExcelSheetNames
};
