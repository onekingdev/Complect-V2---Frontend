import { subIndustries } from "~/data/static.js";
import useVuelidate from "@vuelidate/core";

const MESSAGE_VALIDATORS = {
	"required": "Required field",
	"sameAsPassword": "Password does not match",
	"dateValidate": "Required field",
	"validateRate": "Rate must be greater than 0",
	"email": "Invalid email address"
};

// return random number
const randomNumber = ( minimum = 0, maximum = 100 ) => Math.round( Math.random() * ( maximum - minimum ) + minimum );

// return random MongoDB ID (MongoDB format)
const randomMongoId = () => {
	const timestamp = Math.round( new Date().getTime() / 1000 ).toString( 16 );
	const randomHexString = Array.from({ "length": 16 }, () => Math.floor( Math.random() * 16 ).toString( 16 ) ).join( "" );
	return `${timestamp}${randomHexString}`;
};

const randomId = () => randomMongoId(); // temp ID Generator

// sort Array by Key
const sortArrayByKey = ( array, key, asc ) => {
	if ( !array.length ) return;
	const type = typeof array[0][key];
	if ( type === "string" ) {
		array.sort( ( a, b ) => {
			const valueA = a[key].toString().toUpperCase();
			const valueB = b[key].toString().toUpperCase();
			if ( valueA < valueB ) return asc ? -1 : 1;
			if ( valueA > valueB ) return asc ? 1 : -1;
			return 0;
		});
	}
	if ( type === "number" ) array.sort( ( a, b ) => ( asc ? a[key] : b[key]) - ( asc ? b[key] : a[key]) ); // sort numbers asc/desc
	if ( type === "object" ) array.sort( ( a, b ) => ( asc ? b[key].length : a[key].length ) - ( asc ? a[key].length : b[key].length ) ); // sort arays by length (asc - from biggest to smallest)
};

const splitArrayToChunks = ( array, size = 10 ) => {
	if ( !array.length ) return [];
	const result = [];
	while ( array.length ) result.push( array.splice( 0, size ) );
	return result;
};


const formatDate = date => {
	const options = {
		"year": "numeric",
		"month": "numeric",
		"day": "numeric"
	};
	return new Date( date ).toLocaleString( "en-US", options );
};

const calcRiskLevel = ( impact, likelihood ) => {
	if ( impact === 2 && likelihood > 0 ) return 2;
	else if ( impact === 1 && likelihood === 0 ) return 0;
	else if ( impact === 1 && likelihood === 2 ) return 2;
	else if ( impact === 0 && likelihood < 2 ) return 0;
	return 1;
};

const calcExpandDirections = element => {
	const clientRect = element.getBoundingClientRect();
	const gap = 10;
	const directions = [
		"toRight", "toBottom"
	];
	const toRightEdge = window.innerWidth - clientRect.right;
	const toBottomEdge = window.innerHeight - clientRect.bottom;
	if ( toRightEdge < gap ) directions[0] = "toLeft";
	if ( toBottomEdge < gap ) directions[1] = "toTop";
	return directions;
};

const removeSensitiveData = ( object, keys ) => {
	keys.forEach( key => {
		delete object[key];
	});
};

const filterSubIndustries = ( industries, userType ) => {
	const sub = [];
	if ( !industries ) return sub;
	industries.forEach( industry => {
		subIndustries[userType].forEach( subInd => {
			if ( subInd.value >= industry && subInd.value < industry + 1 ) sub.push( subInd );
		});
	});
	return sub;
};

const validates = async ( rules, data ) => {
	const errors = {};
	const vueValidate = useVuelidate( rules, data );
	await vueValidate.value.$validate();

	if ( vueValidate.value.$errors ) {
		vueValidate.value.$errors.forEach( item => {
			const message = MESSAGE_VALIDATORS[item.$validator] ? MESSAGE_VALIDATORS[item.$validator] : item.$message;
			if ( !errors[item.$property]) errors[item.$property] = [];
			errors[item.$property].push( message );
		});
	}

	return errors;
};

// maxSize is MB
const validateFileSize = ( fileSize, maxFileSize ) => {
	const fileSizeMb = fileSize / 1024 / 1024;
	return fileSizeMb <= maxFileSize;
};

export { randomNumber, randomId, randomMongoId, sortArrayByKey, splitArrayToChunks, formatDate, calcRiskLevel, calcExpandDirections, removeSensitiveData, filterSubIndustries, validates, validateFileSize };
