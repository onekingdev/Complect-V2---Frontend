import { createDocuments, readDocuments, updateDocuments, deleteDocuments } from "../core/crud.js";
import { requestGuard } from "../helpers/utils.js";

export default async function restHandler ( request, response ) {
	try {
		const requestParams = requestGuard( request );
		const methods = {
			"POST": () => createDocuments( ...requestParams ),
			"GET": () => readDocuments( ...requestParams ),
			"PUT": () => updateDocuments( ...requestParams ),
			"DELETE": () => deleteDocuments( ...requestParams )
		};
		const result = await methods[request.method]();
		response.json( result );
	} catch ( error ) {
		response.json( error );
	}
}
