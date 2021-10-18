// ---- Utils ---- //

// return random number
const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

// return random false/true, with chance. (0 - false, 100 - true)
const randomBool = ( chance = 50 ) => Math.random() <= chance / 100;

// return random ID
const randomId = () => {
	const group = () => Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
	return `${group() + group() + group() + group()}`;
};

// return random GUID
const randomGUIDs = () => {
	const group = () => Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
	return `${group() + group()}-${group()}-${group()}-${group()}-${group()}${group()}${group()}`;
};

// return random quantity
const quantityRange = quantity => {
	try {
		let result
		if(typeof quantity === 'number') result = quantity
		else if(Array.isArray(quantity)) result = randomNumber(quantity[0], quantity[1])
		else result = 1
		return result
	} catch(error) {
		console.error(error)
	}
}

// uppercasing first letter in a string: "hello world!" => "Hello world!"
const uppercaseFirstLetter = ( string = "" ) => {
	try {
		if ( typeof string !== "string" ) throw new Error( `Passed param is not a string, but an ${typeof string}.` );
		if ( !string ) throw new Error( "Passed param is empty." );
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	} catch ( error ) {
		throw new Error( error.message );
	}
};

// shuffle Array (Durstenfeld shuffle)
const shuffleArray = array => {
	const shuffled = array.slice( 0 );
	for ( let l = shuffled.length - 1; l > 0; l-- ) {
		const i = Math.floor( Math.random() * ( l + 1 ) );
		[shuffled[l], shuffled[i]] = [shuffled[i], shuffled[l]];
	}
	return shuffled;
};

// return only uniq Objects in Array, by object key
const uniqObjectsInArray = ( array, key ) => [...new Map( array.map( item => [item[key], item]) ).values()];

// random element from Array
const randomElement = array => {
	if ( typeof array !== "object" ) throw new Error( "Passed param is not an Array" );
	const index = randomNumber( 0, array.length - 1 );
	return array[index];
};

// random key from Object
const randomKey = object => {
	if ( typeof object !== "object" ) throw new Error( "Passed param is not an Object" );
	const keys = Object.keys( object );
	return randomElement( keys );
};

// random value from Object
const randomValue = object => {
	if ( typeof object !== "object" ) throw new Error( "Passed param is not an Object" );
	return object[randomKey( object )];
};

// async foreach
const asyncForEach = async ( array, callback ) => {
	for (let index = 0; index < array.length; index++) {
	  await callback(array[index], index, array);
	}
};

// return username from first and last name
const userName = ( firstName, lastName ) => `${firstName}_${lastName}`.toLowerCase()


export {
	randomNumber,
	randomBool,
	randomId,
	randomGUIDs,
	quantityRange,
	uppercaseFirstLetter,
	shuffleArray,
	randomElement,
	uniqObjectsInArray,
	randomKey,
	randomValue,
	asyncForEach,
	userName
}