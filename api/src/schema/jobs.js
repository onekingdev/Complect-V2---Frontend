module.exports = {
	bsonType: "object",
	required: ["_id", "business", "name"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		business: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		name: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		creator: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		project: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		startsAt: {
			bsonType: "int",
			description: "must be a number"
		},
		endsAt: {
			bsonType: "int",
			description: "must be a number"
		},
		description: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		details: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		locationType: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		location: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		jurisdictions: {
			bsonType: "array",
			description: "must be an array"
		},
		industries: {
			bsonType: "array",
			description: "must be an array"
		},
		status: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		minExperience: {
			bsonType: "int",
			minimum: 0,
			maximum: 2,
			description: "must be a number"
		},
		regulator: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		skills: {
			bsonType: "array",
			description: "must be an array"
		},
		budget: {
			bsonType: "array",
			description: "must be an array"
		},
		payment: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		proposals: {
			bsonType: "array",
			description: "must be an array"
		},
		contracts: {
			bsonType: "array",
			description: "must be an array"
		}
	}
};
