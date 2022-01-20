module.exports = {
	bsonType: "object",
	required: ["_id", "owner", "companyName"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		crd: {
			bsonType: "int",
			description: "must be a number"
		},
		owner: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		companyName: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		aum: {
			bsonType: "int",
			description: "must be a number"
		},
		timeZone: {
			bsonType: "object",
			description: "must be an object"
		},
		accountsNumber: {
			bsonType: "int",
			description: "must be a number"
		},
		jurisdictions: {
			bsonType: "array",
			description: "must be an array"
		},
		industries: {
			bsonType: "array",
			description: "must be an array"
		},
		subIndustries: {
			bsonType: "array",
			description: "must be an array"
		},
		companyImage: {
			bsonType: "string",
			description: "must be a string"
		},
		phoneNumber: {
			bsonType: "int",
			description: "must be a number"
		},
		website: {
			bsonType: "string",
			description: "must be a string"
		},
		address: {
			bsonType: "string",
			description: "must be a string"
		},
		apt: {
			bsonType: "string",
			description: "must be a string"
		},
		city: {
			bsonType: "string",
			description: "must be a string"
		},
		state: {
			bsonType: "string",
			description: "must be a string"
		},
		zip: {
			bsonType: "int",
			description: "must be a number"
		},
		plan: {
			bsonType: "string",
			enum: ["starter", "teams", "business"],
			description: "must be a string from list"
		},
		annually: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		employees: {
			bsonType: "array",
			description: "Skills must be an array"
		},
		specialists: {
			bsonType: "array",
			description: "Skills must be an array"
		}
	}
};
