// Modules
import { randomUsers } from './randomUsers.js'
import { quantityRange, randomElement } from '../atoms/utils.js'


// Generate Random Employees Accounts
const randomEmployees = ({ q, id = 1 }) => {
	try {
		let randomEmployees = []
		let quantity = quantityRange(q)
		for (var i = 0; i < quantity; i++) {
			let randomEmployee = {
				...randomUsers({q:1})[0],
				type: "employee",
				business_id: id,
				role: randomElement(["basic", "trusted", "admin"]),
			}
			randomEmployees.push(randomEmployee)
		}
		return randomEmployees
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomEmployees }