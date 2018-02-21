
const axios = require('axios');
const sapHelpBaseUrl = 'https://help.sap.com';
const sapHelpSearch = '/http.svc/suggestion?q=';
const sapHelpStdQueryEnd = '&language=en-US&state=PRODUCTION';

const url = 'https://help.sap.com/http.svc/suggestion?&q=TEST&language=en-US&state=PRODUCTION';


const sapHelp =  () => {
	try {
		const response =  axios.get(url);

		return response;
	} catch (e) {
		throw new Error(e);
	}
}


const searchSapHelpBy =  (search) => {
	try {
		const response =  axios.get(sapHelpBaseUrl
		         + sapHelpSearch +search+ sapHelpStdQueryEnd );

		return response;
	} catch (e) {
		throw new Error(e);
	}
}

const search = 'test';
searchSapHelpBy(search).then((result)=>{
	console.log(`help search by :${search}: - result`,  JSON.stringify(result.data, null,2));

}).catch(err=>console.log(err));
