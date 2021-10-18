/* eslint max-lines-per-function: ["error", 50] */
/* eslint max-statements: ["error", 50] */

export default async function useRest ({ method, collection, id, data }) {
	let body, options, response, answer;
	const apiUrl = "http://localhost:82/v1/demo";
	try {
		body = JSON.stringify({
			collection,
			id,
			data
		});
		options = {
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Max-Age": "86400",
				module: collection
			},
			body
		};
		if ( method === "get" ) options.body = null;
		response = await fetch( `${apiUrl}/${collection}/`, options );
		answer = await response.json();
		return answer;
	} catch ( error ) {
		console.error( `Catch in API restRequest (${method}): ${error}` );
		return { error: error.message };
	} finally {
		body = null;
		options = null;
		response = null;
		answer = null;
	}
}
