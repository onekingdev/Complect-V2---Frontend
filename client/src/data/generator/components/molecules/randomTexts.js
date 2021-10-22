// modules
import { randomNumber, quantityRange, uppercaseFirstLetter } from "../atoms/utils.js";
import { wordsDict } from "../dict/wordsDict.js";
const dictLength = wordsDict.length;

// random Word
const randomWords = ({ q }) => {
	try {
		const quantity = quantityRange( q );
		const randomWords = [];
		for ( let i = 0; i < quantity; i++ ) {
			const wordIndex = randomNumber( 0, dictLength - 1 );
			randomWords.push( wordsDict[wordIndex]);
		}
		return randomWords;
	} catch ( error ) {
		console.error( error );
	}
};

// random Title
const randomTitles = ({ q, w }) => {
	try {
		const quantity = quantityRange( q );
		const randomTitles = [];
		for ( let i = 0; i < quantity; i++ ) {
			const wordsCount = quantityRange( w );
			// console.log(wordsCount)
			const sentence = randomWords({ q: wordsCount }).join( " " );
			randomTitles.push( uppercaseFirstLetter( sentence ) );
		}
		return randomTitles;
	} catch ( error ) {
		console.error( error );
	}
};

// random Sentences
const randomSentences = ({ q, w }) => {
	try {
		const quantity = quantityRange( q );
		const randomSentences = [];
		for ( let i = 0; i < quantity; i++ ) {
			const wordsCount = quantityRange( w );
			// console.log(wordsCount)
			const sentence = `${randomWords({ q: wordsCount }).join( " " )}.`;
			randomSentences.push( uppercaseFirstLetter( sentence ) );
		}
		return randomSentences;
	} catch ( error ) {
		console.error( error );
	}
};

// random Paragraph
const randomParagraphs = ({ q, s, w }) => {
	try {
		const quantity = quantityRange( q );
		const randomParagraphs = [];
		for ( let i = 0; i < quantity; i++ ) {
			const sentencesCount = quantityRange( s );
			const randomParagraph = randomSentences({
				q: sentencesCount,
				w
			}).join( " " );
			randomParagraphs.push( randomParagraph );
		}
		return randomParagraphs;
	} catch ( error ) {
		console.error( error );
	}
};

// random Texts
const randomTexts = ({ q, p, s, w }) => {
	try {
		const quantity = quantityRange( q );
		const randomTexts = [];
		for ( let i = 0; i < quantity; i++ ) {
			const randomText = randomParagraphs({
				q: p,
				s,
				w
			});
			randomTexts.push( randomText );
		}
		return randomTexts;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomWords, randomTitles, randomSentences, randomParagraphs, randomTexts };
