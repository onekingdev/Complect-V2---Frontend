// Modules
import { randomId, randomNumber, quantityRange, randomElement } from '../atoms/utils.js'
import { randomTitles, randomParagraphs } from '../molecules/randomTexts.js'
import { randomDatesInRange } from "../molecules/randomDate.js"


// Risk Level Calculation
const riskLevel = (impact, likelihood) => {
	if ((likelihood > 0) && (impact === 2)) return 2
	else if ((likelihood < 2) && (impact === 0)) return 0
	else return 1
}

// Generate Random Risks
const randomRisks = ({ q }) => {
	try {
		let randomRisks = []
		let quantity = quantityRange(q)
		for (var i = 0; i < quantity; i++) {
			let impact = randomNumber(0,2)
			let likelihood = randomNumber(0,2)
			let randomRisk = {
				business_id: null,
				risk_id: randomId(),
				title: randomTitles({q:1, w:[3,5]})[0],
				created_at: randomDatesInRange({q:1,shift:[-300,-50]})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({q:1,shift:[-50,-20]})[0],
				impact,
				likelihood,
				risk_level: riskLevel(impact, likelihood),
				compliance_policies: []
			}
			randomRisks.push(randomRisk)
		}
		return randomRisks
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomRisks }
