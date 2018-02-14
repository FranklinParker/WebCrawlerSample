let arrayStr = [
	'entry1',
	'entry2',
	'entry3'
];


let str = 'entry';


let result = arrayStr.find((arr)=> arr === str);

console.log('result', result);

if(!result){
	console.log('Did not find:' + str);
	arrayStr.push(str);
}else{
	console.log('found:', result);
}


console.log('new List', arrayStr);