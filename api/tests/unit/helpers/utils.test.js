/* global describe, test, expect */
const { response, randomNumber, checkFields, devStageLog, randomName, requestGuard } = require("../../../src/helpers/utils.js");


describe( "response:", () => {
	let result = response( {httpCode: 200, message: "Tested", data: "Data" });
	let body = JSON.parse(result.body)
	test( "should return an object", () => expect( result ).toBeObject() );
	test( "should contain", () => expect( result ).toContainAllKeys(["statusCode", "headers", "body"]) );
	test( "should contain body data", () => expect( body ).toContainAllKeys(["ok", "message", "data"]) );
});

describe( "randomNumber:", () => {
	const result = randomNumber( 0, 100 );
	test( 'should be throw expection if not a number', () => {
		expect( result ).not.toBeNull();
		expect( result ).not.toBeUndefined();
	});
	test( 'should be return Number', () => expect( typeof result ).toBe('number') );
});

describe( "checkFields:", () => {
	const object = {
		"name": "fake name",
		"email": "fake@test.com",
		"password": "123",
		"age":5
	}
	const keys1 = ["name", "email"];
	const keys2 = ["name", "gender"];
	const result1 = checkFields( object, keys1 );
	const result2 = checkFields( object, keys2 );
	test( 'should be return boolean', () => expect( typeof result1 ).toBe('boolean') );
	test( 'should be return true if correct object, keys', () => expect( result1 ).toEqual( true ) );
	test( 'should be return false if wrong object, keys', () => expect( result2 ).toEqual( false ) );
});

describe( "randomName:", () => {
	const result = randomName(6);
	test( 'should be throw expection if not a number', () => {
		expect( result ).not.toBeNull();
		expect( result ).not.toBeUndefined();
	});
	test( 'should be return string', () => expect( typeof result ).toBe('string') );
	test( 'should be return number length 6', () => expect( result ).toHaveLength(6) );
});
