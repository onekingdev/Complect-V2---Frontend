// modules
import { quantityRange, randomNumber, randomBool, randomElement } from "../atoms/utils.js";
import { randomUsers } from "./randomUsers.js";
import { randomSkills } from "../molecules/randomSkills.js";


// generate Random Employees Accounts
const randomSpecialists = ({ q, byPlans = false }) => {
	try {
		const plans = ["basic", "pro"];
		const specialists = [];
		let quantity;
		if ( byPlans ) quantity = plans.length;
		else quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const plan = byPlans ? plans[i] : randomElement( plans );
			const specialist = {
				...randomUsers({ q: 1 })[0],
				type: "specialist",
				skills: randomSkills({ q: [1, 10] }),
				plan,
				specialistAther: null,
				resumeUrl: null,
				availability: randomBool(),
				experience: randomNumber( 0, 2 ),
				formerRegulator: false,
				minHourlyRate: Math.round( randomNumber( 20, 200 ) / 5 ) * 5 // to have nice numbers (20, 55, 120 etc)
			};
			specialists.push( specialist );
		}
		return specialists;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomSpecialists };
