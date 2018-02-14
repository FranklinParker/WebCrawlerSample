
const fs = require('fs');


var processTerm = (html,sapGlosRecords) => {
	var termRecord = {};
	const td = '<TD><FONT FACE="Arial" COLOR="#FEFEEE" SIZE="5">';
	const tdStart = html.indexOf(td) > -1 ? html.indexOf(td) + td.length + 1 : -1;


	const h3 = '<H3>';
	const h3Start = html.indexOf(h3) > -1 ? html.indexOf(h3) + 4 : -1;
	const h3End = html.indexOf('(', h3Start);
	if (h3Start > -1 && h3End > h3Start) {

		const h3Len = h3End - h3Start;

		const h3Text = html.substr(h3Start, h3Len);
		termRecord.term = h3Text;
		termRecord.softwareComponent = getSoftwareComponent(html.substr(h3Start));

	}

	processPTags(html, termRecord);

	sapGlosRecords.push(termRecord);

	console.log(JSON.stringify(termRecord, null, 2));

};


var processPTags = (html, termRecord) => {
	var start = 0;
	termRecord.text = '';

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


var getSoftwareComponent = (h3txt) => {
	let start = h3txt.indexOf('(') + 1;
	let end = h3txt.indexOf(')');
	let sfComp = h3txt.substr(start, (end - start));
	return sfComp;
}

module.exports.htmlParser ={
	processTerm
}