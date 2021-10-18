// Modules
import { randomId, randomNumber, quantityRange, randomElement } from '../atoms/utils.js'
import { randomSkills } from "../molecules/randomSkills.js"
import { randomTitles, randomParagraphs } from '../molecules/randomTexts.js'
import { randomDatesInRange } from "../molecules/randomDate.js"
import { randomJurisdictions } from "../molecules/randomJurisdictions.js"
import { randomIndustries } from "../molecules/randomIndustries.js"


// Generate Random Projects
const randomProjects = ({ q }) => {
	try {
		let randomProjects = []
		let quantity = quantityRange(q)
		for (var i = 0; i < quantity; i++) {
			let randomProject = {
				business_id: null,
				project_id: randomId(),
				title: randomTitles({q:1, w:[3,5]})[0],
				description: randomParagraphs({q:1, s:[1,3], w:[3,7]})[0],
				experience: randomNumber(0,2),
				jurisdictions: randomJurisdictions({q:[1,3]}),
				industries: randomIndustries({q:[1,3]}),
				sub_industries: [],
				created_at: randomDatesInRange({q:1,shift:[-300,-50]})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({q:1,shift:[-50,-20]})[0],
				starts_at: randomDatesInRange({q:1,shift:[-20,50]})[0],
				ends_at: randomDatesInRange({q:1,shift:[50,150]})[0], // shift date forward for random days number between 50 and 150
				status: randomElement(["draft", "inprogress", "complete"]),
				skills: randomSkills({q:[0,10]}),
				fixed_budget: Math.round(randomNumber(100,20000) / 100) * 100,
				collaborators: [],
				tasks: [],
				location: null,
				published: null,
				type: null,
			}
			randomProjects.push(randomProject)
		}
		return randomProjects
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomProjects }