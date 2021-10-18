// Modules
import { randomUsers } from './randomUsers.js'
import { randomId, quantityRange, randomElement } from '../atoms/utils.js'
import { randomCompanies } from "../molecules/randomCompanies.js"


// Generate Random Businesses Accounts
const randomBusinesses = ({ q, byPlans = false }) => {
	try {
		let plans = ["basic", "team", "business"]
		let randomBusinesses = []
		let quantity = quantityRange(q)
		if(byPlans) quantity = plans.length
		for (var i = 0; i < quantity; i++) {
			let company = randomCompanies({q:1})[0]
			let plan = byPlans ? plans[i] : randomElement(plans)
			let randomBusiness = {
				...randomUsers({q:1})[0],
				business_id: randomId(),
				type: "business",
				plan,
				business_name: company.name,
				websites: company.website,
				state: company.state,
				city: company.city,
				address1: company.address,
				logo: null,
				aum: null,
				crd: null,
				cnt: null,
			}
			randomBusinesses.push(randomBusiness)
		}
		return randomBusinesses
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}

export { randomBusinesses }