// modules
import { randomNumber, quantityRange } from "../atoms/utils.js";
import { gendersDict } from "../dict/gendersDict.js";


// random Genders
const randomGenders = ({ q }) => {
	try {
		const quantity = quantityRange( q );
		const randomGenders = [];
		for ( let i = 1; i <= quantity; i++ ) {
			const genderIndex = randomNumber( 0, gendersDict.length - 1 );
			const randomGender = gendersDict[genderIndex];
			randomGenders.push( randomGender );
		}
		return randomGenders;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomGenders };
