module.exports = {
	bsonType: "object",
	required: ["_id", "name", "startsAt", "endsAt", "business"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		name: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		businessId: {
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
