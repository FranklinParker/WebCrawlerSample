var Crawler = require("simplecrawler");
const htmlParser = require('./webcrawler/parsingSap').htmlParser;
const fs = require('fs');
const {sapGlossarySqlDb} = require('./database/sapGlossSql');


const sapGlosRecords = [];

let processedUrls = [];



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
			sapGlossarySqlDb.insertSapGlossary(termRecord)
				.then(sapGlossRec => {
					console.log('inserted record Id:' + sapGlossRec.id);
					// if (count === 100) {
					// 	console.log('exiting at:' + count);
					// 	process.exit(0);
					// }
				});

		}

	}


});

crawler.on('complete', () => {
	console.log('done ');


});

crawler.maxDepth = 4;
crawler.start();

