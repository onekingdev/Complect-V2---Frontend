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
		impact: {
			bsonType: "int",
			minimum: 0,
			maximum: 2,
			description: "must be a number"
		},
		likelihood: {
			bsonType: "int",
			minimum: 0,
			maximum: 2,
			description: "must be a number"
		},
		riskLevel: {
			bsonType: "int",
			minimum: 0,
			maximum: 2,
			description: "must be a number"
		},
		controls: {
			bsonType: "array",
			description: "must be an array"
		}
	}
};
