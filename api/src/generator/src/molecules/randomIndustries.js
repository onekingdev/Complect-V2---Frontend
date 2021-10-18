// Modules
import { shuffleArray, quantityRange } from '../atoms/utils.js'
import { industriesDict } from '../dict/industriesDict.js'


// Random Industries
const randomIndustries = ({ q }) => {
	try {
		let randomIndustries = []
		let quantity = quantityRange(q)
		if(quantity > industriesDict.length) quantity = industriesDict.length-1
		let shuffledDict = shuffleArray(industriesDict)
		for (var i = 0; i < quantity; i++) {
			randomIndustries.push(shuffledDict[i])
		}
		return randomIndustries
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomIndustries }