module.exports = {
	bsonType: "object",
	required: ["_id", "email", "password", "firstName", "lastName"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		email: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		password: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		firstName: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		lastName: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		description: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		timeZone: {
			bsonType: "object",
			description: "must be an object"
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
		regulator: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		skills: {
			bsonType: "array",
			description: "Skills must be an array"
		},
		hourlyRate: {
			bsonType: "int",
			minimum: 0,
			description: "must be a number"
		},
		experience: {
			bsonType: "int",
			minimum: 0,
			maximum: 2,
			description: "must be a number"
		},
		resume: {
			bsonType: "string",
			description: "must be a string"
		},
		available: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		plan: {
			bsonType: "string",
			description: "must be a string"
		},
		profileImage: {
			bsonType: "string",
			description: "must be a string"
		},
		contracts: {
			bsonType: "array",
			description: "must be an array"
		},
		notifications: {
			bsonType: "object",
			description: "must be an object"
		},
		settings: {
			bsonType: "object",
			description: "must be an object"
		}
	}
};
