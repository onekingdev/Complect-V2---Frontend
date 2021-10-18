// Modules
import { randomId, randomBool, quantityRange, randomElement } from '../atoms/utils.js'
import { randomTitles, randomParagraphs } from '../molecules/randomTexts.js'
import { randomDatesInRange } from "../molecules/randomDate.js"


// Generate Random Policies
const randomPolicies = ({q}) => {
	try {
		let randomPolicies = []
		let quantity = quantityRange(q)
		for (var i = 0; i < quantity; i++) {
			let randomPolicie = {
				business_id: null,
				policie_id: randomId(),
				title: randomTitles({q:1, w:[3,5]})[0],
				description: randomParagraphs({q:1, s:[1,3], w:[3,7]})[0],
				created_at: randomDatesInRange({q:1,shift:[-300,-50]})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({q:1,shift:[-50,-20]})[0],
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
			}
			randomPolicies.push(randomPolicie)
		}
		return randomPolicies
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomPolicies }
