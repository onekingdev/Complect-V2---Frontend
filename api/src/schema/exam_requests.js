module.exports = {
	bsonType: "object",
	required: ["_id", "name", "examId"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		name: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		examId: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		completed: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		shared: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		createdAt: {
			bsonType: "int",
			description: "must be a number"
		},
		modifiedAt: {
			bsonType: "int",
			description: "must be a number"
		}
	}
};
