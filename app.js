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
	console.log(html);
	const td = '<TD><FONT FACE="Arial" COLOR="#FEFEEE" SIZE="5">';
	const tdStart = html.indexOf(td)>-1 ? html.indexOf(td)+ td.length +1: -1;

	const tdEnd = html.indexOf('</FONT></TD>');
	if(tdEnd>tdStart && tdStart>-1){
		const len = tdEnd - tdStart -1;
		termRecord.name = html.substr(tdStart, len);
	}


	const h3 = '<H3>';
	const h3Start = html.indexOf(h3)>-1?html.indexOf(h3) +4: -1;
	const h3End =  html.indexOf('</H3>');
	if(h3Start>-1 && h3End>h3Start){
		const h3Len =  h3End - h3Start;
		const h3Text = html.substr(h3Start, h3Len);

		termRecord.term = h3Text;
	}


	const p1 = '<P><FONT FACE="Arial" SIZE=2>';
	const p1Start = html.indexOf(p1)>-1?html.indexOf(p1) + p1.length: -1;
	const p1End =  html.indexOf('</FONT></P>');
	if(p1Start>-1 && p1Start>p1End){
		const len =  p1End - p1Start;
		termRecord.shortDefinition  = html.substr(p1Start,len);
	}


	const p2 = '<P><FONT FACE="Arial" SIZE=2>';
	const p2Start = html.indexOf(p1End,p2)>-1?html.indexOf(p1End,p2) + p1.length: -1;
	const p2End =  html.indexOf(p1End + '</FONT></P>'.length,'</FONT></P>');
	if(p2Start>-1 && p2Start>p2End){
		const len =  p2End - p2Start;
		termRecord.longDefinition  = html.substr(p2Start,len);
	}

	console.log('term record', termRecord);

};