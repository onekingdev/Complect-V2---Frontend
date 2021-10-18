// Modules
import { randomNumber, quantityRange } from '../atoms/utils.js'
import { providersDict } from '../dict/emailsDict.js'


// Random Emails
const randomEmails = ({q, firstName = 'John', lastName = 'Smith', company}) => {
	try {
		let randomEmails = []
		let quantity = quantityRange(q)
		let fullName = `${firstName}.${lastName}`.toLowerCase()
		if(company) randomEmails.push(`${fullName}@${company}`)
		for (var i = 1; i <= quantity; i++) {
			let emailProvierIndex = randomNumber(0, providersDict.length-1)
			randomEmails.push(`${fullName}@${providersDict[emailProvierIndex]}`)
		}
		return randomEmails
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomEmails }