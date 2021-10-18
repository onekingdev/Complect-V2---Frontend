// Modules
import { randomNumber, quantityRange } from '../atoms/utils.js'


// Random Phone Number
const randomPhoneNumbers = ({q, countryCode = '+1'}) => {
	try {
		let randomPhoneNumbers = []
		let quantity = quantityRange(q)
		for (var i = 1; i <= quantity; i++) {
			let areaCode = randomNumber(1e2, 9e2).toString()
			let subscriberNumber = randomNumber(1e6, 9e6).toString()
			randomPhoneNumbers.push(countryCode + areaCode + subscriberNumber)
		}
		return randomPhoneNumbers
	} catch(error) {
		console.error(error)
		return ['!Error']
	}
}


export  { randomPhoneNumbers }