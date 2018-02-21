
const axios = require('axios');
const sapHelpBaseUrl = 'https://help.sap.com';
const sapHelpSearch = '/http.svc/suggestion?q=';
const sapHelpStdQueryEnd = '&language=en-US&state=PRODUCTION';

/**
 * const url = 'https://help.sap.com/http.svc/suggestion?&q=TEST&language=en-US&state=PRODUCTION';
 *
 */


/**
 * searchSapHelpBy returns a promise
 *
 *
 * @param search
 */

const searchSapHelpBy = async (search) => {
	try {
		const response =  await axios.get(sapHelpBaseUrl
			   +  sapHelpSearch + search + sapHelpStdQueryEnd);
		return response.data;

	} catch (e) {
		throw new Error(e);
	}
}

module.exports.sapHelpSearch = {
	searchSapHelpBy
}

const search = 'test';
const testSearch = async ()=>{
	const data = await searchSapHelpBy(search);
	console.log("search By "+ search + " data " + JSON.stringify(data, null,2 ));
}

//testSearch();
