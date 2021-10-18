// Modules
import { randomNumber, quantityRange } from '../atoms/utils.js'


// Random Dates in Range (days)
const randomDatesInRange = ({ q, shift }) => {
	try {
		let quantity = quantityRange(q)
		let date = Date.now()
		let randomDatesInRange = []
		for (var i = 1; i <= quantity; i++) {
			let days = randomNumber(shift[0], shift[1]) * 86400000
			randomDatesInRange.push(date + days)
		}
		return randomDatesInRange
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomDatesInRange }