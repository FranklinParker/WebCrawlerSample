var Crawler = require("simplecrawler");
const htmlParser = require('./webcrawler/parsingSap').htmlParser;
const fs = require('fs');
const sapGlossryDb = require('./database/cloudant').sapGlossaryDB;

const sapGlosRecords = [];

let processedUrls = [];




/**
 * sample usage:
 *
 *
 * @param filePath
 * @param data
 */
var logToFile = (data) => {
	fs.writeFileSync('/Users/franklinparker/temp/sapTermsAll.json', data);

};

let count = 0;
let dupCount = 0;

let crawler = Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/35/2cd77bd7705394e10000009b387c12/frameset.htm");
const matchUrl = 'https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US';


crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {

	if (queueItem.url.substr(0, matchUrl.length) === matchUrl &&
		queueItem.url.indexOf('content.htm') != -1
		&& responseBuffer.toString().indexOf('<P><FONT FACE=') != -1) {
		const urlSearch = processedUrls.find((url) => url === queueItem.url);
		if (urlSearch) {
			dupCount++;
			console.log('already processed url:' + urlSearch +
				': dupCount:' + dupCount);
		} else {
			processedUrls.push(queueItem.url);
			count++;
			const termRecord = htmlParser.processSapTerm(responseBuffer.toString(), sapGlosRecords, queueItem.url);
			console.log('processing url:' + queueItem.url + ': processed Count:' + count);
			termRecord._id = count + termRecord.softwareComponent;
			sapGlossryDb.insertSapGLossaryRecord(termRecord,(error, result)=>{
				if(error){
					console.log('error inserting sap_glossary', error);
				}else if(result){
					console.log("sap_glossary added id=" + result.id);
				}else{
					console.log("sap_glossary unknown result termrec._id=" + termRecord._id);
				}
				// if(count===100){
				// 	console.log('exiting at:' + count);
				// 	process.exit(0);
				// }
			});

		}

	}


});

crawler.on('complete', () => {
	console.log('done');

	//logToFile(JSON.stringify(sapGlosRecords, null, 2));

});

crawler.maxDepth = 4;
crawler.start();

