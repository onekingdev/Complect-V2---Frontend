// modules
import { shuffleArray, quantityRange } from "../atoms/utils.js";
import { skillsDict } from "../dict/skillsDict.js";


// random Skills
const randomSkills = ({ q }) => {
	try {
		const randomSkills = [];
		let quantity;
		if ( quantity > skillsDict.length ) quantity = skillsDict.length - 1;
		else quantityRange( q );
		const shuffledDict = shuffleArray( skillsDict );
		for ( let i = 0; i < quantity; i++ ) randomSkills.push( shuffledDict[i]);

		return randomSkills;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomSkills };
