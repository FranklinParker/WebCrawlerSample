var Crawler = require("simplecrawler");
var i = 0;

var crawler = Crawler("https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/35/2cd77bd7705394e10000009b387c12/frameset.htm");

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
//	console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
//	console.log("It was a resource of type %s", response.headers['content-type']);
//
	const startUrl = 'https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US';
	// if(queueItem.url===
	// 		'https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/46/3cf388e6da51cae10000000a1553ed/content.htm0'){
	// 	console.log(responseBuffer);
	//
	//
	// }
	if(queueItem.url.substr(0,startUrl.length ) === startUrl &&
	    queueItem.url.indexOf('content.htm')!=-1
		&& responseBuffer.toString().indexOf('<P><FONT FACE=')!=-1){
		console.log(queueItem.url);
		i++;
		processTerm(responseBuffer.toString());
	}
	// if(i===20){
	// 	process.exit(0);
	// }
		// 'https://help.sap.com/http.svc/rc/saphelp_glossary/latest/en-US/46/3cf388e6da51cae10000000a1553ed/content.htm0'){
		// console.log(responseBuffer);


});


crawler.maxDepth = 4;
crawler.start();


var processTerm = (html) => {
	var termRecord = {};

	const h3 = '<H3>';
	const h3Start = html.indexOf(h3) +4;
	const h3End =  html.indexOf('</H3>');
	if(h3Start>-1 && h3End>h3Start){
		const h3Len =  h3End - h3Start;
		termRecord.term = h3Text;
		const h3Text = html.substr(h3Start, h3Len);
		termRecord.term = h3Text;
	}

	console.log('term record', termRecord);

};