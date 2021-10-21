// modules
import { randomId, randomBool, quantityRange, randomElement } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// generate Random Policies
const randomPolicies = ({ q }) => {
	try {
		const policies = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const policie = {
				business_id: null,
				policie_id: randomId(),
				title: randomTitles({
					q: 1,
					w: [3, 5]
				})[0],
				description: randomParagraphs({
					q: 1,
					s: [1, 3],
					w: [3, 7]
				})[0],
				created_at: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				status: randomElement(["draft", "inprogress", "complete"]),
				archived: randomBool(),
				position: null,
				src_id: null,
				sections: [],
				versions: [],
				published_by: null,
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
