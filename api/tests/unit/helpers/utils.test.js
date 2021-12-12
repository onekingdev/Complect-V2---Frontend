/* global describe, test, expect */
const { response, requestGuard } = require("../../../src/helpers/utils.js");


describe( "response:", () => {
	let result = response( 200, "Tested" );
	let body = JSON.parse(result.body)
	test( "should return an object", () => expect( result ).toBeObject() );
	test( "should contain", () => expect( result ).toContainAllKeys(["statusCode", "headers", "body"]) );
	test( "should contain body data", () => expect( body ).toContainAllKeys(["ok", "message", "data"]) );
});

describe( "requestGuard:", () => {
	let result;
	let event = {
		pathParameters: {
			collectionName: "testCollection",
			documentId: "616efaf4f9d840a73f0f1ca6"
		},
		body: JSON.stringify([{user: "John"}])
	};
	let array = [
		...Object.values(event.pathParameters),
		[{user: "John"}]
	]
	beforeEach( async () => {
		result = await requestGuard( event );
	});

	test( "should return an array", () => expect( result ).toBeArray() );
	test( "should have same size", () => expect( result ).toBeArrayOfSize(3) );
	test( "should return an array that contain all original values", () => expect( result ).toIncludeAllMembers(array) );
});