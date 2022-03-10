/* global describe, test, expect */
const { response, requestGuard } = require("../../../src/helpers/utils.js");


describe( "response:", () => {
	let result = response( {httpCode: 200, message: "Tested", data: "Data" });
	let body = JSON.parse(result.body)
	test( "should return an object", () => expect( result ).toBeObject() );
	test( "should contain", () => expect( result ).toContainAllKeys(["statusCode", "headers", "body"]) );
	test( "should contain body data", () => expect( body ).toContainAllKeys(["ok", "message", "data"]) );
});
