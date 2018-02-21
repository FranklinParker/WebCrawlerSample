
const axios = require('axios');

const url = 'https://help.sap.com/http.svc/suggestion?&q=TEST&language=en-US&state=PRODUCTION';


const sapHelp =  () => {
	try {
		const response =  axios.get(url);

		return response;
	} catch (e) {
		throw new Error(e);
	}
}

sapHelp().then((result)=>{
	console.log('help search result',  JSON.stringify(result.data, null,2));

}).catch(err=>console.log(err));
