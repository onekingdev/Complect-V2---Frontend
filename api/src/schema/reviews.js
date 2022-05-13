module.exports = {
	bsonType: "object",
	required: ["_id", "business", "name", "creator"],
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
		createdAt: {
			bsonType: "int",
			description: "must be a number"
		},
		modifiedAt: {
			bsonType: "int",
			description: "must be a number"
		},
		startsAt: {
			bsonType: "int",
			description: "must be a number"
		},
		endsAt: {
			bsonType: "int",
			description: "must be a number"
		},
		tasks: {
			bsonType: "array",
			description: "must be an array"
		},
		documents: {
			bsonType: "array",
			description: "must be an array"
		},
		businessChanges: {
			bsonType: "string",
			description: "must be a string"
		},
		regulatoryChanges: {
			bsonType: "array",
			description: "must be an array"
		},
		employeesInterviewed: {
			bsonType: "array",
			description: "must be an array"
		},
		categories: {
			bsonType: "array",
			description: "must be an array"
		}
	}
};
