// modules
import { quantityRange } from "../atoms/utils.js";


// random Addresses
const randomAddresses = ({ q }) => {
	try {
		const randomAddresses = [];
		const quantity = quantityRange( q );
		for ( let i = 1; i <= quantity; i++ ) {
			const randomAddress = "Address";
			randomAddresses.push( randomAddress );
		}
		return randomAddresses;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomAddresses };
