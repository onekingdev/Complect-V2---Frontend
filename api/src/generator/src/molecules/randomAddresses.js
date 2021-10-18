// Modules
import { quantityRange } from '../atoms/utils.js'


// Random Addresses
function randomAddresses({q}) {
	try {
		let randomAddresses = []
		let quantity = quantityRange(q)
		for (var i = 1; i <= quantity; i++) {
			let randomAddress = 'Address'
			randomAddresses.push(randomAddress)
		}
		return randomAddresses
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomAddresses }