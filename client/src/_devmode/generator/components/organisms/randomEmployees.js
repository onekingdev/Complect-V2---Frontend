// modules
import { randomUsers } from "./randomUsers.js";
import { quantityRange, randomElement } from "../atoms/utils.js";


// generate Random Employees Accounts
const randomEmployees = ({ q, id = 1 }) => {
	try {
		const employees = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const employee = {
				...randomUsers({ q: 1 })[0],
				type: "employee",
				businessId: id,
				role: randomElement(["basic", "trusted", "admin"])
			};
			employees.push( employee );
		}
		return employees;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomEmployees };
