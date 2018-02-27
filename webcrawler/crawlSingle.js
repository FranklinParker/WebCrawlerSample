var Crawler = require("simplecrawler");
const htmlParser = require('./parsingSap').htmlParser;
const fs = require('fs');
//const sapGlossryDb = require('./database/cloudant').sapGlossaryDB;
const {sapGlossarySqlDb } = require('../database/sapGlossSql');


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
	fs.writeFileSync('/Users/franklinparker/temp/sapTermSingle.json', data);

};

let count = 0;
let dupCount = 0;

var crawler = Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/8a/02cb8a77ddd31184080004aca6e0d1/content.htm");
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
			console.log('termRecord:', termRecord);
			sapGlossarySqlDb.insertSapGlossary(termRecord)
				.then(sapGlossRec=> console.log('inserted record Id:' + sapGlossRec.id));


		}

	}


});

crawler.on('complete', () => {
	console.log('done');
	const sapGlossDB = require('../database/cloudant');

	logToFile(JSON.stringify(sapGlosRecords, null, 2));

});

crawler.maxDepth = 4;
crawler.start();

