// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";


// random Dates in Range (days)
const randomDatesInRange = ({ q, shift }) => {
	try {
		const quantity = quantityRange( q );
		const date = Date.now();
		const randomDatesInRange = [];
		for ( let i = 1; i <= quantity; i++ ) {
			const days = randomNumber( shift[0], shift[1]) * 86400000;
			randomDatesInRange.push( date + days );
		}
		return randomDatesInRange;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomDatesInRange };
