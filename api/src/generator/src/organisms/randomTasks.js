// Modules
import { randomId, quantityRange, randomElement } from '../atoms/utils.js'
import { randomTitles, randomParagraphs } from '../molecules/randomTexts.js'
import { randomDatesInRange } from "../molecules/randomDate.js"


// Generate Random Tasks
const randomTasks = ({ q }) => {
	try {
		let randomTasks = []
		let quantity = quantityRange(q)
		for (var i = 0; i < quantity; i++) {
			let randomTask = {
				business_id: null,
				task_id: randomId(),
				title: randomTitles({q:1, w:[1,5]})[0],
				description: randomParagraphs({q:1, s:[1,3], w:[3,7]})[0],
				status: randomElement(["draft", "inprogress", "complete"]),
				created_at: randomDatesInRange({q:1,shift:[-300,-50]})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({q:1,shift:[-50,-20]})[0],
				linked_to: null,
				assignee_to: null,
				repeats: null
			}
			randomTasks.push(randomTask)
		}
		return randomTasks
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomTasks }
