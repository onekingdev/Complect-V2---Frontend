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
		createdAt: {
			bsonType: "int",
			description: "must be a number"
		},
		modifiedAt: {
			bsonType: "int",
			description: "must be a number"
		},
		status: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		tasks: {
			bsonType: "array",
			description: "must be an array"
		},
		risks: {
			bsonType: "array",
			description: "must be an array"
		}
	}
};
