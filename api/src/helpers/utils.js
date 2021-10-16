const logger = {
	"info": message => console.info( "\x1b[34m%s\x1b[0m", "INFO:", message ), // eslint-disable-line no-console
	"log": message => console.log( "\x1b[35m%s\x1b[0m", "LOG:", message ), // eslint-disable-line no-console
	"warn": message => console.warn( "\x1b[33m%s\x1b[0m", "WARN:", message ), // eslint-disable-line no-console
	"error": message => console.error( "\x1b[31m%s\x1b[0m", "ERROR:", message ) // eslint-disable-line no-console
};

// todo: request checks
const requestGuard = ( request ) => {
	try {
		const { databaseName, collectionName, documentId } = request.params;
		const newDocuments = request.body;
		return [databaseName, collectionName, documentId, newDocuments];
	} catch ( error ) {
		logger.error( `requestGuard ${error}` );
		return false;
	}
};

// todo: finish answer
const answer = {
	"successful": ( statusCode, message, result ) => ({
		statusCode,
		"body": {
			"success": true,
			message,
			result
		}
	}),
	"error": ( statusCode, error ) => ({
		statusCode,
		"body": {
			"success": false,
			"error": error.message
		}
	})
};

export { logger, answer, requestGuard };
