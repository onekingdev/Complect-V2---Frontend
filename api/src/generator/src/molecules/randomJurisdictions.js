// Modules
import { shuffleArray, quantityRange } from '../atoms/utils.js'
import { jurisdictionsDict } from '../dict/jurisdictionsDict.js'


// Random Jurisdictions
const randomJurisdictions = ({ q }) => {
	try {
		let randomJurisdictions = []
		let quantity = quantityRange(q)
		if(quantity > jurisdictionsDict.length) quantity = jurisdictionsDict.length-1
		let shuffledDict = shuffleArray(jurisdictionsDict)
		for (var i = 0; i < quantity; i++) {
			randomJurisdictions.push(shuffledDict[i])
		}
		return randomJurisdictions
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomJurisdictions }