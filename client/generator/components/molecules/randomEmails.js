// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";
import { providersDict } from "../dict/emailsDict.js";


// random Emails
const randomEmails = ({ q, firstName = "John", lastName = "Smith", company }) => {
	try {
		const randomEmails = [];
		const quantity = quantityRange( q );
		const fullName = `${firstName}.${lastName}`.toLowerCase();
		if ( company ) randomEmails.push( `${fullName}@${company}` );
		for ( let i = 1; i <= quantity; i++ ) {
			const emailProvierIndex = randomNumber( 0, providersDict.length - 1 );
			randomEmails.push( `${fullName}@${providersDict[emailProvierIndex]}` );
		}
		return randomEmails;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomEmails };
