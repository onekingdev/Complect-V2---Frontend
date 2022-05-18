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
		status: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		discussion: {
			bsonType: "array",
			description: "must be an array"
		},
		tasks: {
			bsonType: "array",
			description: "must be an array"
		},
		documents: {
			bsonType: "array",
			description: "must be an array"
		},
		collaborators: {
			bsonType: "array",
			description: "must be an array"
		},
		jobs: {
			bsonType: "array",
			description: "must be an array"
		}
	}
};
