// modules
import { randomMongoId, quantityRange } from "../atoms/utils.js";
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
				_id: randomMongoId(),
				businessId: null,
				title: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				createdAt: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0],
				updatedAt: randomDatesInRange({
					q: 1,
					shift: [-50, -20]
				})[0],
				reviewStartsAt: randomDatesInRange({
					q: 1,
					shift: [-300, -50]
				})[0],
				reviewEndsAt: randomDatesInRange({
					q: 1,
					shift: [50, 120]
				})[0],
				examStartsAt: null,
				examEndsAt: null,
				year: 2021,
				complete: false,
				completedAt: null,
				pdfUrl: null,
				reviewCategories: randomReviewCategories({ q: [0, 10] }),
				materialBusinessChanges: randomParagraphs({
					q: 1,
					s: [1, 5],
					w: [5, 20]
				})[0],
				regulatoryChanges: [],
				annualReviewEmployees: []
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
