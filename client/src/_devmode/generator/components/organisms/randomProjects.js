// modules
import { randomMongoId, randomNumber, quantityRange, randomElement } from "../atoms/utils.js";
import { randomSkills } from "../molecules/randomSkills.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";
import { randomJurisdictions } from "../molecules/randomJurisdictions.js";
import { randomIndustries } from "../molecules/randomIndustries.js";


// generate Random Projects
const randomProjects = ({ q }) => {
	try {
		const projects = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const project = {
				_id: randomMongoId(),
				businessId: null,
				title: randomTitles({
					q: 1,
					w: [3, 5]
				})[0],
				description: randomParagraphs({
					q: 1,
					s: [1, 3],
					w: [3, 7]
				})[0],
				experience: randomNumber( 0, 2 ),
				jurisdictions: randomJurisdictions({ q: [1, 3] }),
				industries: randomIndustries({ q: [1, 3] }),
				subIndustries: [],
				createdAt: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updatedAt: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				startsAt: randomDatesInRange({
					q: 1,
					shift: [-20, 50]
				})[0],
				endsAt: randomDatesInRange({
					q: 1,
					shift: [50, 150]
				})[0], // shift date forward for random days number between 50 and 150
				status: randomElement(["draft", "inprogress", "complete"]),
				skills: randomSkills({ q: [0, 10] }),
				fixedBudget: Math.round( randomNumber( 100, 20000 ) / 100 ) * 100,
				collaborators: [],
				tasks: [],
				location: null,
				published: null,
				type: null
			};
			projects.push( project );
		}
		return projects;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomProjects };
