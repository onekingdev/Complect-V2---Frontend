// server response format
const response = ( code = 200, message = "", data = "" ) => {
	const body = {
		ok: code === 200,
		message,
		data
	};
	return {
		statusCode: code,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify( body )
	};
};

// logger
const logger = {
	info: message => console.info( "\x1b[34m%s\x1b[0m", "INFO:", message ), // eslint-disable-line no-console
	log: message => console.log( "\x1b[35m%s\x1b[0m", "LOG:", message ), // eslint-disable-line no-console
	warn: message => console.warn( "\x1b[33m%s\x1b[0m", "WARN:", message ), // eslint-disable-line no-console
	error: message => console.error( "\x1b[31m%s\x1b[0m", "ERROR:", message ) // eslint-disable-line no-console
};

// request guard
const requestGuard = async event => {
	try {
		const { collectionName, documentId } = event.pathParameters;
		const newDocuments = await JSON.parse( event.body );
		return [collectionName, documentId, newDocuments].filter( Boolean );
	} catch ( error ) {
		logger.error( `requestGuard ${error}` );
		return false;
	}
};


export { requestGuard, response, logger };
