// Modules
import { randomBool, quantityRange } from '../atoms/utils.js'
import { randomTitles, randomParagraphs } from '../molecules/randomTexts.js'
import { randomDatesInRange } from "../molecules/randomDate.js"


// Random Review Topics Items
const randomReviewTopicsItems = ({ q }) => {
	try {
		let randomReviewTopicsItems = []
		let quantity = quantityRange(q)
		for (var i = 1; i <= quantity; i++) {
			let randomReviewTopicsItem = {
				body: randomParagraphs({q:1, s:[1,2], w:[5,10]})[0],
				checked: randomBool(),
				findings: randomBool() ? randomParagraphs({q:1, s:[1,5], w:[5,20]})[0] : ''
			}
			randomReviewTopicsItems.push(randomReviewTopicsItem)
		}
		return randomReviewTopicsItems
	} catch(error) {
		console.error(error)
		return ['!Error']
	}
}

// Random Review Topics
const randomReviewTopics = ({ q }) => {
	try {
		let randomReviewTopics = []
		let quantity = quantityRange(q)
		for (var i = 1; i <= quantity; i++) {
			let randomReviewTopic = {
				title: randomTitles({q:1, w:[1,5]})[0],
				items: randomReviewTopicsItems({q:[0,10]})
			}
			randomReviewTopics.push(randomReviewTopic)
		}
		return randomReviewTopics
	} catch(error) {
		console.error(error)
		return ['!Error']
	}
}

// Random Review Categories
const randomReviewCategories = ({ q }) => {
	try {
		let randomReviewCategories = []
		let quantity = quantityRange(q)
		for (var i = 1; i <= quantity; i++) {
			let randomReviewCategory = {
				complete: randomBool(),
				title: randomTitles({q:1, w:[1,5]})[0],
				created_at: randomDatesInRange({q:1,shift:[-300,-50]})[0],
				updated_at: randomDatesInRange({q:1,shift:[-50,-20]})[0],
				review_topics: randomReviewTopics({q:[0,10]})
			}
			randomReviewCategories.push(randomReviewCategory)
		}
		return randomReviewCategories
	} catch(error) {
		console.error(error)
		return ['!Error']
	}
}


export  { randomReviewCategories }