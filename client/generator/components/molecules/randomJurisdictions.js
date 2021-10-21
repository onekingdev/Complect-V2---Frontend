// modules
import { shuffleArray, quantityRange } from "../atoms/utils.js";
import { jurisdictionsDict } from "../dict/jurisdictionsDict.js";


// random Jurisdictions
const randomJurisdictions = ({ q }) => {
	try {
		const randomJurisdictions = [];
		let quantity;
		if ( quantity > jurisdictionsDict.length ) quantity = jurisdictionsDict.length - 1;
		else quantityRange( q );
		const shuffledDict = shuffleArray( jurisdictionsDict );
		for ( let i = 0; i < quantity; i++ ) randomJurisdictions.push( shuffledDict[i]);

		return randomJurisdictions;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomJurisdictions };
