// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";
import { companiesDict } from "../dict/companiesDict.js";


// random Companies
const randomCompanies = ({ q }) => {
	try {
		const quantity = quantityRange( q );
		const randomCompanies = [];
		for ( let i = 1; i <= quantity; i++ ) {
			const companyIndex = randomNumber( 0, companiesDict.length - 1 );
			const randomCompany = companiesDict[companyIndex];
			randomCompanies.push( randomCompany );
		}
		return randomCompanies;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomCompanies };
