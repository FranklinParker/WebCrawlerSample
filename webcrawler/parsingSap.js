
const fs = require('fs');


var processSapTerm = (html,sapGlosRecords, url) => {
	var termRecord = {
		url: url
	};
	processTermFromTd(html, termRecord);

	const h3 = '<H3>';
	const h3Start = html.indexOf(h3) > -1 ? html.indexOf(h3) + 4 : -1;
	const h3End = html.indexOf('</H3>', h3Start);

	if (h3Start > -1 && h3End > h3Start) {

		const h3Len = h3End - h3Start;

		const h3Text = html.substr(h3Start, h3Len);
		termRecord.termHeader = h3Text;

	}

	processPTags(html, termRecord);

	sapGlosRecords.push(termRecord);
	return termRecord;


};

var processTermFromTd= (html, termRecord) =>{
	const td = '<TD><FONT FACE="Arial" COLOR="#FEFEEE" SIZE="5">';
	const tdStart = html.indexOf(td) > -1 ? html.indexOf(td) + td.length + 2 : -1;
	const tdEnd = html.indexOf('</FONT></TD>');

	if(tdEnd>tdStart && tdStart>-1){
		const len = tdEnd - tdStart -2;
		let tdValue = html.substr(tdStart, len);
		const endOfTerm = tdValue.indexOf('(');
		if(endOfTerm>0){
			termRecord.term = tdValue.substring(0,endOfTerm );
			let endOfTd = tdValue.indexOf(')');
			console.log('tdValue:'+ tdValue + ':endofTerm:'
				+ endOfTerm+ ":endOfTd:" + endOfTd);
			termRecord.softwareComponent = tdValue.substring(endOfTerm+1, endOfTd);
		}

	}

}


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



module.exports.htmlParser ={
	processSapTerm
}