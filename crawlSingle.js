var Crawler = require("simplecrawler");
const htmlParser = require('./webcrawler/parsingSap').htmlParser;
const fs = require('fs');

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
			htmlParser.processSapTerm(responseBuffer.toString(), sapGlosRecords, queueItem.url);
			console.log('processing url:' + queueItem.url + ': processed Count:' + count);

		}

	}


});

crawler.on('complete', () => {
	console.log('done');
	logToFile(JSON.stringify(sapGlosRecords, null, 2));

});

crawler.maxDepth = 4;
crawler.start();

