module.exports = {
	bsonType: "object",
	required: ["_id", "business", "specialist"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		business: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		specialist: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		project: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		job: {
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
		status: {
			bsonType: "string",
			description: "must be a string and is required"
		}
	}
};
