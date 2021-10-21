// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";
import { maleNamesDict, femaleNamesDict, lastNamesDict } from "../dict/namesDict.js";


// random First Names
const randomFirstNames = ({ q, gender }) => {
	try {
		const quantity = quantityRange( q );
		const randomFirstNames = [];
		for ( let i = 0; i < quantity; i++ ) {
			const nameIndex = randomNumber( 0, 999 );
			randomFirstNames.push( gender.sex === "male" ? maleNamesDict[nameIndex] : femaleNamesDict[nameIndex]);
		}
		return randomFirstNames;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};

// random Last Names
const randomLastNames = ({ q }) => {
	try {
		const quantity = quantityRange( q );
		const randomFirstNames = [];
		for ( let i = 0; i < quantity; i++ ) randomFirstNames.push( lastNamesDict[randomNumber( 0, lastNamesDict.length - 1 )]);

		return randomFirstNames;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomFirstNames, randomLastNames };
