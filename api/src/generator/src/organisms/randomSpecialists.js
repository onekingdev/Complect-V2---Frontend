// Modules
import { quantityRange, randomNumber, randomBool, randomElement } from '../atoms/utils.js'
import { randomUsers } from './randomUsers.js'
import { randomSkills } from '../molecules/randomSkills.js'


// Generate Random Employees Accounts
const randomSpecialists = ({ q, byPlans = false }) => {
	try {
		let plans = ["basic", "pro"]
		let randomSpecialists = []
		let quantity = quantityRange(q)
		if(byPlans) quantity = plans.length
		for (var i = 0; i < quantity; i++) {
			let plan = byPlans ? plans[i] : randomElement(plans)
			let randomSpecialist = {
				...randomUsers({q:1})[0],
				type: "specialist",
				skills: randomSkills({q:[1,10]}),
				plan,
				specialist_other: null,
				resume_url: null,
				availability: randomBool(),
				experience: randomNumber(0,2),
				former_regulator: false,
				min_hourly_rate: Math.round(randomNumber(20,200) / 5) * 5, // to have nice numbers (20, 55, 120 etc)
			}
			randomSpecialists.push(randomSpecialist)
		}
		return randomSpecialists
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomSpecialists }