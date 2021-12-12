import { createDocuments, readDocuments, updateDocument, deleteDocuments } from "./crud.js";
import { requestGuard, response, logger } from "../helpers/utils.js";

const router = async event => {
	try {
		const requestParams = await requestGuard( event );
		const methods = {
			POST: () => createDocuments( ...requestParams ),
			GET: () => readDocuments( ...requestParams ),
			PUT: () => updateDocument( ...requestParams ),
			DELETE: () => deleteDocuments( ...requestParams )
		};
		return await methods[event.httpMethod]();
	} catch ( error ) {
		logger.error( error );
		return response( 400, error );
	}
};

export { router };
