/* global describe, test, expect */
import { randomNumber, randomMongoId, sortArrayByKey, formatDate } from "../../src/core/utils.js";


describe( "randomNumber():", () => {
	let minimum = -10;
	let maximum = 10;
	let result;
	beforeEach( () => result = randomNumber( minimum, maximum ) );
	test( "should return a number, without passing params", () => expect( randomNumber() ).toBeNumber() );
	test( "should return a number", () => expect( result ).toBeNumber() );
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

describe( "sortArrayByKey():", () => {
	const data = [
		{ name: "Alice", age: 32, skills: ["skill1"] },
		{ name: "Bob", age: 40, skills: ["skill1", "skill2"] },
		{ name: "Bob", age: 40, skills: ["skill1", "skill2"] },
		{ name: "Bill", age: 30, skills: ["skill1", "skill2", "skill3"] }
	]
	// Empty Array
	const result = sortArrayByKey( [], "name", true);
	test( "should be empty", () => {
		console.log(result)
		expect( result ).toBeNil()
	});

	// String Type
	test( "should be same size (string type)", () => {
		sortArrayByKey( data, "name", true);
		expect( data ).toBeArrayOfSize(4)
	});
	test( "should be ASC Sorted (string type)", () => {
		sortArrayByKey( data, "name", true);
		expect( data[0].name).toMatch("Alice");
		expect( data[1].name).toMatch("Bill");
		expect( data[2].name).toMatch("Bob");
		expect( data[3].name).toMatch("Bob");
	});
	test( "should be DESC Sorted (string type)", () => {
		sortArrayByKey( data, "name", false);
		expect( data[0].name).toMatch("Bob");
		expect( data[1].name).toMatch("Bob");
		expect( data[2].name).toMatch("Bill");
		expect( data[3].name).toMatch("Alice");
	});

	// Number Type
	test( "should be same size (number type)", () => {
		sortArrayByKey( data, "age", true);
		expect( data ).toBeArrayOfSize(4)
	});
	test( "should be ASC Sorted (number type)", () => {
		sortArrayByKey( data, "age", true);
		expect( data[0].age).toBeNumber(30);
		expect( data[1].age).toBeNumber(32);
		expect( data[2].age).toBeNumber(40);
		expect( data[3].age).toBeNumber(40);
	});
	test( "should be DESC Sorted (number type)", () => {
		sortArrayByKey( data, "age", false);
		expect( data[0].age).toBeNumber(40);
		expect( data[1].age).toBeNumber(40);
		expect( data[2].age).toBeNumber(32);
		expect( data[3].age).toBeNumber(30);
	});

	// Object Type
	test( "should be same size (object type)", () => {
		sortArrayByKey( data, "skills", true);
		expect( data ).toBeArrayOfSize(4)
	});
	test( "should be ASC Sorted (object type)", () => {
		sortArrayByKey( data, "skills", true);
		expect( data[0].skills ).toBeArrayOfSize(3);
		expect( data[1].skills[1] ).toMatch("skill2");
		expect( data[2].skills ).toBeArrayOfSize(2);
		expect( data[3].skills ).toBeArrayOfSize(1);
		expect( data[3].skills[0] ).toMatch("skill1");
	});
	test( "should be DESC Sorted (object type)", () => {
		sortArrayByKey( data, "skills", false);
		expect( data[0].skills ).toBeArrayOfSize(1);
		expect( data[0].skills[0] ).toMatch("skill1");
		expect( data[1].skills ).toBeArrayOfSize(2);
		expect( data[2].skills ).toBeArrayOfSize(2);
		expect( data[3].skills[2] ).toMatch("skill3");
		
	});
});


describe( "formatDate():", () => {
	let result;
	beforeEach( () => result = formatDate(Date.now()) );
	test( "should return valid date", () => {
		expect(new Date(result)).toBeValidDate();
		expect(new Date(result)).toBeBetween(new Date('12/25/2021'), new Date('12/25/2300'));
	});
});