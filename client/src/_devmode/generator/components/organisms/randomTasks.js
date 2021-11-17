// modules
import { randomMongoId, quantityRange, randomElement } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// generate Random Tasks
const randomTasks = ({ q }) => {
	try {
		const tasks = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const task = {
				_id: randomMongoId(),
				business_id: null,
				title: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				description: randomParagraphs({
					q: 1,
					s: [1, 3],
					w: [3, 7]
				})[0],
				status: randomElement(["draft", "inprogress", "complete"]),
				created_at: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				linked_to: null,
				assignee_to: null,
				repeats: null
			};
			tasks.push( task );
		}
		return tasks;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomTasks };
