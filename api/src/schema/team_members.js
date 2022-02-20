module.exports = {
	bsonType: "object",
	required: ["_id", "email", "firstName", "lastName", "business"],
	properties: {
		_id: {
			bsonType: "objectId",
			description: "must be an ObjectId and is required"
		},
		role: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		email: {
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
		businessId: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		accessPerson: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		startDate: {
			bsonType: "int",
			description: "must be a number"
		},
		disabled: {
			bsonType: "bool",
			description: "must be a boolean"
		},
		disabledAt: {
			bsonType: "int",
			description: "must be a number"
		},
		disabledReason: {
			bsonType: "string",
			description: "must be an string"
		},
		disabledReasonInfor: {
			bsonType: "string",
			description: "must be a string"
		},
		invitationToken: {
			bsonType: "string",
			description: "must be a string"
		},
		invitationTokenExpireAt: {
			bsonType: "int",
			description: "must be an number"
		},
		userId: {
			bsonType: "string",
			description: "must be a string"
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
