// modules
import { randomMongoId, randomBool, quantityRange, randomElement } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// generate Random Policies
const randomPolicies = ({ q }) => {
	try {
		const policies = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const policie = {
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
				createdAt: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updatedAt: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				status: randomElement(["draft", "inprogress", "complete"]),
				archived: randomBool(),
				position: null,
				srcId: null,
				sections: [],
				versions: [],
				publishedBy: null,
				pdf: null,
				tasks: [],
				risks: []
			};
			policies.push( policie );
		}
		return policies;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomPolicies };
