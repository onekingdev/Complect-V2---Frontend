module.exports = {
	bsonType: "object",
	required: ["_id", "title", "employer", "startsAt", "userId"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		userId: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		title: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		employer: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		startsAt: {
			bsonType: "int",
			description: "must be a number and is required"
		},
		endsAt: {
			bsonType: "int",
			description: "must be a number"
		},
		description: {
			bsonType: "string",
			description: "must be a string and is required"
		},
    isPresent: {
			bsonType: "bool",
			description: "must be a boolean"
		}
	}
};
