// modules
import { shuffleArray, quantityRange } from "../atoms/utils.js";
import { industriesDict } from "../dict/industriesDict.js";


// random Industries
const randomIndustries = ({ q }) => {
	try {
		const randomIndustries = [];
		let quantity;
		if ( quantity > industriesDict.length ) quantity = industriesDict.length - 1;
		else quantityRange( q );
		const shuffledDict = shuffleArray( industriesDict );
		for ( let i = 0; i < quantity; i++ ) randomIndustries.push( shuffledDict[i]);

		return randomIndustries;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomIndustries };
