// Modules
import { randomNumber, quantityRange, uppercaseFirstLetter } from '../atoms/utils.js'
import { wordsDict } from '../dict/wordsDict.js'
const dictLength = wordsDict.length

// Random Word
const randomWords = ({ q }) => {
	try {
		let quantity = quantityRange(q)
		let randomWords = []
		for (var i = 0; i < quantity; i++) {
			let wordIndex = randomNumber(0,dictLength-1)
			randomWords.push(wordsDict[wordIndex])
		}
		return randomWords
	} catch(error) {
		console.error(error)
	}
}

// Random Title
const randomTitles = ({ q, w }) => {
	try {
		let quantity = quantityRange(q)
		let randomTitles = []
		for (var i = 0; i < quantity; i++) {
			let wordsCount = quantityRange(w)
			// console.log(wordsCount)
			let sentence = randomWords({q:wordsCount}).join(' ')
			randomTitles.push(uppercaseFirstLetter(sentence))
		}
		return randomTitles
	} catch(error) {
		console.error(error)
	}
}

// Random Sentences
const randomSentences = ({ q, w }) => {
	try {
		let quantity = quantityRange(q)
		let randomSentences = []
		for (var i = 0; i < quantity; i++) {
			let wordsCount = quantityRange(w)
			// console.log(wordsCount)
			let sentence = randomWords({q:wordsCount}).join(' ') + '.'
			randomSentences.push(uppercaseFirstLetter(sentence))
		}
		return randomSentences
	} catch(error) {
		console.error(error)
	}
}

// Random Paragraph
const randomParagraphs = ({ q, s, w}) => {
	try {
		let quantity = quantityRange(q)
		let randomParagraphs = []
		for (var i = 0; i < quantity; i++) {
			let sentencesCount = quantityRange(s)
			let randomParagraph = randomSentences({q:sentencesCount, w: w}).join(' ')
			randomParagraphs.push(randomParagraph)
		}
		return randomParagraphs
	} catch(error) {
		console.error(error)
	}
}

// Random Texts
const randomTexts = ({ q, p, s, w }) => {
	try {
		let quantity = quantityRange(q)
		let randomTexts = []
		for (var i = 0; i < quantity; i++) {
			let randomText = randomParagraphs({q:p,s:s,w:w})
			randomTexts.push(randomText)
		}
		return randomTexts
	} catch(error) {
		console.error(error)
		return ["!Error"]
	}
}


export { randomWords, randomTitles, randomSentences, randomParagraphs, randomTexts }