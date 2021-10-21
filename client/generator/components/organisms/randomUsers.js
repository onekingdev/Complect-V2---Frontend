// modules
import { randomId, quantityRange, randomNumber, userName } from "../atoms/utils.js";
import { randomFirstNames, randomLastNames } from "../molecules/randomName.js";
import { randomEmails } from "../molecules/randomEmails.js";
import { randomPhoneNumbers } from "../molecules/randomPhoneNumbers.js";
import { randomAvatars } from "../molecules/randomAvatars.js";
import { randomGenders } from "../molecules/randomGenders.js";
import { randomCompanies } from "../molecules/randomCompanies.js";
import { randomJurisdictions } from "../molecules/randomJurisdictions.js";
import { randomIndustries } from "../molecules/randomIndustries.js";


// generate Random Users Accounts
const randomUsers = ({ q }) => {
	try {
		const users = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const gender = randomGenders({ q: 1 })[0];
			const firstName = randomFirstNames({
				q: 1,
				gender
			})[0];
			const lastName = randomLastNames({ q: 1 })[0];
			const company = randomCompanies({ q: 1 })[0];
			const user = {
				user_id: randomId(),
				phone: randomPhoneNumbers({
					q: 1,
					code: "+1"
				})[0],
				email: randomEmails({
					q: 1,
					firstName,
					lastName
				})[0],
				first_name: firstName,
				last_name: lastName,
				username: userName( firstName, lastName ),
				photo: randomAvatars({
					q: 1,
					gender
				})[0],
				country: "United States",
				state: company.state,
				city: company.city,
				address_1: company.address,
				address_2: null,
				apartment: randomNumber( 1, 100 ),
				zip: randomNumber( 90001, 96162 ),
				time_zone: "UTC -7",
				jurisdictions: randomJurisdictions({ q: [1, 3] }),
				industries: randomIndustries({ q: [1, 3] }),
				sub_industries: []
			};
			users.push( user );
		}
		return users;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomUsers };
