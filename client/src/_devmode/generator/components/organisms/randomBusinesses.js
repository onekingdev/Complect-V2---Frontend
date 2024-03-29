// modules
import { randomUsers } from "./randomUsers.js";
import { randomMongoId, quantityRange, randomElement } from "../atoms/utils.js";
import { randomCompanies } from "../molecules/randomCompanies.js";


// generate Random Businesses Accounts
const randomBusinesses = ({ q, byPlans = false }) => {
	try {
		const plans = ["basic", "team", "business"];
		const businesses = [];
		let quantity;
		if ( byPlans ) quantity = plans.length;
		else quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const company = randomCompanies({ q: 1 })[0];
			const plan = byPlans ? plans[i] : randomElement( plans );
			const business = {
				...randomUsers({ q: 1 })[0],
				businessId: randomMongoId(),
				type: "business",
				plan,
				businessName: company.name,
				websites: company.website,
				state: company.state,
				city: company.city,
				address1: company.address,
				logo: null,
				aum: null,
				crd: null,
				cnt: null
			};
			businesses.push( business );
		}
		return businesses;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};

export { randomBusinesses };
