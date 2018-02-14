const fs = require('fs');

let jsonArr = [];

/**
 * sample usage:
 *
 *
 * @param filePath
 * @param data
 */
var logToFile =  (data) =>{
	let writeStream = fs.createWriteStream('/Users/franklinparker/temp/test.json');

	writeStream.write(data);

	writeStream.on('finish', () => {
		console.log('wrote all data to file');
	});
	writeStream.end();

};


var genJson = (count, callback)=>{
	var json = {
		name: 'joe'+ count,
		desc: 'test file write' + count
	};
	//console.log('json', json);
	callback(json);
};

var testMethod = () =>{
	for(i = 0; i< 5000;i++){
		genJson(i, (json)=>{
			jsonArr.push(json);
			logToFile(JSON.stringify(jsonArr,null,2));
		});
	}
};

testMethod();






