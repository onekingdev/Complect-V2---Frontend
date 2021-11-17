// modules
import { randomMongoId, randomNumber, quantityRange } from "../atoms/utils.js";
import { randomTitles } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// risk Level Calculation
const riskLevel = ( impact, likelihood ) => {
	if ( likelihood > 0 && impact === 2 ) return 2;
	else if ( likelihood < 2 && impact === 0 ) return 0;
	return 1;
};

// generate Random Risks
const randomRisks = ({ q }) => {
	try {
		const risks = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const impact = randomNumber( 0, 2 );
			const likelihood = randomNumber( 0, 2 );
			const risk = {
				_id: randomMongoId(),
				business_id: null,
				title: randomTitles({
					q: 1,
					w: [3, 5]
				})[0],
				created_at: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0], // shift date back for random days number between 500 and 300
				updated_at: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				impact,
				likelihood,
				risk_level: riskLevel( impact, likelihood ),
				compliance_policies: []
			};
			risks.push( risk );
		}
		return risks;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomRisks };
