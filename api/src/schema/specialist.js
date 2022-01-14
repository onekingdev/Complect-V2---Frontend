const specialist = {
	bsonType: "object",
	required: ["firstName", "lastName", "email", "password"],
	properties: {
		firstName: {
			bsonType: "string",
			description: "must be a string and is required"
		},
		lastName: {
			bsonType: "string",
			description: "must be a string and is required"
		}
	}
};

module.exports = { specialist };
