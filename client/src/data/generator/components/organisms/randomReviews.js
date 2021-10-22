// modules
import { randomId, quantityRange } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomReviewCategories } from "../molecules/randomReviewCategories.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// generate Random Reviews
const randomReviews = ({ q }) => {
	try {
		const reviews = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const review = {
				business_id: null,
				review_id: randomId(),
				title: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				created_at: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0],
				updated_at: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				review_starts_at: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0],
				review_ends_at: randomDatesInRange({
					q: 1,
					shift: [50, 120]
				})[0],
				exam_starts_at: null,
				exam_ends_at: null,
				year: 2021,
				complete: false,
				completed_at: null,
				pdf_url: null,
				review_categories: randomReviewCategories({ q: [0, 10] }),
				material_business_changes: randomParagraphs({
					q: 1,
					s: [1, 5],
					w: [5, 20]
				})[0],
				regulatory_changes: [],
				annual_review_employees: []
			};
			reviews.push( review );
		}
		return reviews;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomReviews };
