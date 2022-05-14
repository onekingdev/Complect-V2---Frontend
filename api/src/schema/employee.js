module.exports = {
	bsonType: "object",
	required: ["_id", "email", "password", "firstName", "lastName", "business"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		type: {
			bsonType: "string",
			description: "must be a string and is required"
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
		business: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		country: {
			bsonType: "string",
			description: "must be a string"
		},
		state: {
			bsonType: "string",
			description: "must be a string"
		},
		city: {
			bsonType: "string",
			description: "must be a string"
		},
		phoneNumber: {
			bsonType: "int",
			description: "must be a number"
		},
		timeZone: {
			bsonType: "object",
			description: "must be an object"
		},
		profileImage: {
			bsonType: "string",
			description: "must be a string"
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
