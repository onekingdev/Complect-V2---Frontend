// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";


// random Phone Number
const randomPhoneNumbers = ({ q, countryCode = "+1" }) => {
	try {
		const randomPhoneNumbers = [];
		const quantity = quantityRange( q );
		for ( let i = 1; i <= quantity; i++ ) {
			const areaCode = randomNumber( 1e2, 9e2 ).toString();
			const subscriberNumber = randomNumber( 1e6, 9e6 ).toString();
			randomPhoneNumbers.push( countryCode + areaCode + subscriberNumber );
		}
		return randomPhoneNumbers;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomPhoneNumbers };
