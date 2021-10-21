// modules
import { randomBool, quantityRange } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";


// random Review Topics Items
const randomReviewTopicsItems = ({ q }) => {
	try {
		const randomReviewTopicsItems = [];
		const quantity = quantityRange( q );
		for ( let i = 1; i <= quantity; i++ ) {
			const randomReviewTopicsItem = {
				body: randomParagraphs({
					q: 1,
					s: [1, 2],
					w: [5, 10]
				})[0],
				checked: randomBool(),
				findings: randomBool() ? randomParagraphs({
					q: 1,
					s: [1, 5],
					w: [5, 20]
				})[0] : ""
			};
			randomReviewTopicsItems.push( randomReviewTopicsItem );
		}
		return randomReviewTopicsItems;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};

// random Review Topics
const randomReviewTopics = ({ q }) => {
	try {
		const randomReviewTopics = [];
		const quantity = quantityRange( q );
		for ( let i = 1; i <= quantity; i++ ) {
			const randomReviewTopic = {
				title: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				items: randomReviewTopicsItems({ q: [0, 10] })
			};
			randomReviewTopics.push( randomReviewTopic );
		}
		return randomReviewTopics;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};

// random Review Categories
const randomReviewCategories = ({ q }) => {
	try {
		const randomReviewCategories = [];
		const quantity = quantityRange( q );
		for ( let i = 1; i <= quantity; i++ ) {
			const randomReviewCategory = {
				complete: randomBool(),
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
				review_topics: randomReviewTopics({ q: [0, 10] })
			};
			randomReviewCategories.push( randomReviewCategory );
		}
		return randomReviewCategories;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomReviewCategories };
