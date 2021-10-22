/* eslint max-lines-per-function: ["error", 50] */
/* eslint max-statements: ["error", 50] */

const databaseName = "dev";

const endpoint = collectionName => `http://localhost:82/v1/${databaseName}/${collectionName}`;

export default async function useRest ({ method, collectionName, newDocuments }) {
	try {
		const apiUrl = endpoint( collectionName );
		const options = {
			method,
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Max-Age": "86400"
			},
			body: JSON.stringify( newDocuments )
		};
		const response = await fetch( apiUrl, options );
		if ( !response.ok ) throw new Error( response.message );
		const answer = await response.json();
		return answer;
	} catch ( error ) {
		console.error( error );
		return { error: error.message };
	}
}
