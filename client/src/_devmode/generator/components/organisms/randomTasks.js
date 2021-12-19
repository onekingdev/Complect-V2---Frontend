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
				businessId: null,
				title: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				description: randomParagraphs({
					q: 1,
					s: [1, 3],
					w: [3, 7]
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
				createdAt: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updatedAt: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				linkedTo: null,
				assigneeTo: null,
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
