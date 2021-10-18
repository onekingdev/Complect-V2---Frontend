import { generateDatabase, updateDatabase, dropDatabase } from "./handlers.js";

export default async function dataGenerator ( request, response ) {
	try {
		const methods = {
			"POST": () => generateDatabase(),
			"PUT": () => updateDatabase(),
			"DELETE": () => dropDatabase()
		};
		const result = await methods[request.method]();
		response.json( result );
	} catch ( error ) {
		response.json( error );
	}
}
