/* global describe, test, expect */
import { randomNumber, randomMongoId } from "../../src/core/utils.js";


describe( "randomNumber():", () => {
	let minimum = -10;
	let maximum = 10;
	let result;
	beforeEach( () => result = randomNumber( minimum, maximum ) );
	test( "should return a number", () => expect( result ).toBeNumber() );
	test( "should return a number, without passing params", () => expect( randomNumber() ).toBeNumber() );
	test( "should return a value between minimum and maximum numbers, inclusive them", () => {
		expect( result ).toBeGreaterThanOrEqual( minimum );
		expect( result ).toBeLessThanOrEqual( maximum );
	});
});


describe( "randomMongoId():", () => {
	let result;
	beforeEach( () => result = randomMongoId() );
	test( "should be defined", () => expect(result).not.toBeUndefined() );
	test( "should return a string", () => expect( result ).toBeString() );
	test( "should return a string.length equal 24", () => expect( result ).toHaveLength( 24 ) );
});