// Modules
import { randomNumber, quantityRange } from '../atoms/utils.js'
import { malePortraitsDict, femalePortraitsDict } from '../dict/portraitsDict.js'


const randomAvatars = ({ q, gender }) => {
	try {
		let quantity = quantityRange(q)
		let randomAvatars = []
		let portraitsDict = gender.sex === 'male' ? malePortraitsDict : femalePortraitsDict
		for (var i = 0; i < quantity; i++) {
			let portraitIndex = randomNumber(0, portraitsDict.length-1)
			let avatar = portraitsDict[portraitIndex]
			randomAvatars.push(`https://images.unsplash.com/${avatar.path}?ixid=${avatar.ixid}&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60`)
		}
		return randomAvatars
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomAvatars }