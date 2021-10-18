// Modules
import { shuffleArray, quantityRange } from '../atoms/utils.js'
import { skillsDict } from '../dict/skillsDict.js'


// Random Skills
const randomSkills = ({q}) => {
	try {
		let randomSkills = []
		let quantity = quantityRange(q)
		if(quantity > skillsDict.length) quantity = skillsDict.length-1
		let shuffledDict = shuffleArray(skillsDict)
		for (var i = 0; i < quantity; i++) {
			randomSkills.push(shuffledDict[i])
		}
		return randomSkills
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomSkills }