var Crawler = require("simplecrawler");

const fs = require('fs');

const sapGlosRecords = [];


/**
 * sample usage:
 *
 *
 * @param filePath
 * @param data
 */
var logToFile = (data) => {
	//let writeStream = fs.createWriteStream('/Users/franklinparker/temp/sapTerms.json');
	fs.writeFileSync('/Users/franklinparker/temp/sapTerms.json', data);
	// writeStream.write(data);
	//
	// writeStream.on('finish', () => {
	// 	console.log('wrote all data to file');
	// });
	//
	// writeStream.end();
};

let count = 0;

//let crawler = Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/35/2cd77bd7705394e10000009b387c12/frameset.htm");
var crawler = Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/8a/02cb8a77ddd31184080004aca6e0d1/content.htm");
// Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/ac/7a154f6a074247b44223809242eed5/content.htm");
const matchUrl = 'https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US';


crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {


	if (queueItem.url.substr(0, matchUrl.length) === matchUrl &&
		queueItem.url.indexOf('content.htm') != -1
		&& responseBuffer.toString().indexOf('<P><FONT FACE=') != -1) {
		console.log(queueItem.url);
		count++;
		processTerm(responseBuffer.toString());
	}
	if (count === 300) {
		logToFile(JSON.stringify(sapGlosRecords, null, 2));
		process.exit(0);

	}


});


crawler.maxDepth = 4;
crawler.start();


var processTerm = (html) => {
	var termRecord = {

	};
	const td = '<TD><FONT FACE="Arial" COLOR="#FEFEEE" SIZE="5">';
	const tdStart = html.indexOf(td) > -1 ? html.indexOf(td) + td.length + 1 : -1;



	const h3 = '<H3>';
	const h3Start = html.indexOf(h3) > -1 ? html.indexOf(h3) + 4 : -1;
	const h3End = html.indexOf('(',h3Start);
	if (h3Start > -1 && h3End > h3Start) {

		const h3Len = h3End - h3Start;

		const h3Text = html.substr(h3Start, h3Len);
		termRecord.term = h3Text;
		termRecord.softwareComponent =  getSoftwareComponent(html.substr(h3Start));
	}

	processPTags(html, termRecord);

	sapGlosRecords.push(termRecord);

	console.log(JSON.stringify(termRecord, null, 2));

};


var processPTags = (html, termRecord) => {
	var start = 0;
	termRecord.text ='';

	while (start != -1) {
		const p2 = '<P><FONT FACE="Arial" SIZE=2>';
		const p2Start = html.indexOf(p2, start) > -1 ? html.indexOf(p2, start) + p2.length : -1;
		const p2End = html.indexOf('</FONT></P>', start + p2.length);

		if (p2Start > -1 && p2End > p2Start) {
			const len = p2End - p2Start;
			termRecord.text += html.substr(p2Start, len);
			start = p2End;
		} else {
			start = -1;
		}
	}
}


var getSoftwareComponent = (h3txt)=> {
		let start = h3txt.indexOf('(') + 1;
		let end = h3txt.indexOf(')');
		let sfComp = h3txt.substr(start , (end - start));
		return sfComp;

}