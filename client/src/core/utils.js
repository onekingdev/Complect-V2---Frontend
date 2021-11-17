
// return random number
const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

// return random MongoDB ID (MongoDB format)
const randomMongoId = () => {
	const timestamp = Math.round( new Date().getTime() / 1000 ).toString( 16 );
	const randomHexString = Array.from({ "length": 16 }, () => Math.floor( Math.random() * 16 ).toString( 16 ) ).join( "" );
	return `${timestamp}${randomHexString}`;
};


const saveForm = ( original, update ) => {
	Object.keys( update ).forEach( key => original[key] = update[key]);
};


export { randomNumber, randomMongoId, saveForm };
