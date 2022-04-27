const formCards = [
	{
		"type": "attestation",
		"title": "Attestation Forms",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
		"formCount": "1",
		"routeName": "FormLibraryEntry"
	}, {
		"type": "logs",
		"title": "Employee Log Forms",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
		"formCount": "1",
		"routeName": "FormLibraryEntry"
	}, {
		"type": "approval",
		"title": "Pre-Approval Forms",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
		"formCount": "1",
		"routeName": "FormLibraryEntry"
	}
];

const formLibraryData = [
	{
		"_id": "6253c8b84d0c24ae67e36161",
		"name": "Attestation Form 1",
		"type": "attestation",
		"status": "draft",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	},
	{
		"_id": "6253c8b84d0c24ae67e36162",
		"name": "Attestation Form 2",
		"type": "attestation",
		"status": "published",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	},
	{
		"_id": "6253c8b84d0c24ae67e36163",
		"name": "Employee Log 1",
		"type": "logs",
		"status": "draft",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	},
	{
		"_id": "6253c8b84d0c24ae67e36164",
		"name": "Employee Log 2",
		"type": "logs",
		"status": "published",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	},
	{
		"_id": "6253c8b84d0c24ae67e36163",
		"name": "Pre-Approval 1",
		"type": "approval",
		"status": "draft",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	},
	{
		"_id": "6253c8b84d0c24ae67e36164",
		"name": "Pre-Approval 2",
		"type": "approval",
		"status": "published",
		"dateCreated": 1647000337214,
		"owner": "Alex Lim"
	}
];

const ethicsData = [
	{
		"_id": "6253c8b84d0c24ae67e36111",
		"name": "Inadvertent Receipt of Client Assets",
		"type": "logs",
		"status": "new",
		"lastModified": 1647000337214,
		"lastModifiedBy": "Anakin Skywalker",
		"dateCreated": 1647000337214
	},
	{
		"_id": "6253c8b84d0c24ae67e36112",
		"name": "Gifts & Entertainment",
		"type": "logs",
		"status": "reviewed",
		"lastModified": 1647000337214,
		"lastModifiedBy": "Anakin Skywalker",
		"dateCreated": 1647000337214
	}
];

const ethicsAllEntriesData = [
	{
		"_id": "6253c8b84d0c24ae67e36101",
		"ethics_id": "6253c8b84d0c24ae67e36111",
		"dateSubmitted": 1647000337214,
		"Respondent": "Jerry Skywalker",
		"status": "new",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Gift from outside company."
	},
	{
		"_id": "6253c8b84d0c24ae67e36102",
		"ethics_id": "6253c8b84d0c24ae67e36111",
		"dateSubmitted": 1647000337214,
		"Respondent": "Jane Doe",
		"status": "reviewed",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Lorem ipsum dolor it amet."
	},
	{
		"_id": "6253c8b84d0c24ae67e36103",
		"ethics_id": "6253c8b84d0c24ae67e36111",
		"dateSubmitted": 1647000337214,
		"Respondent": "Elaine Windu",
		"status": "reviewed",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Lorem ipsum dolor it amet."
	},
	{
		"_id": "6253c8b84d0c24ae67e36101",
		"ethics_id": "6253c8b84d0c24ae67e36112",
		"dateSubmitted": 1647000337214,
		"Respondent": "Jerry Skywalker",
		"status": "new",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Gift from outside company."
	},
	{
		"_id": "6253c8b84d0c24ae67e36102",
		"ethics_id": "6253c8b84d0c24ae67e36112",
		"dateSubmitted": 1647000337214,
		"Respondent": "Jane Doe",
		"status": "new",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Lorem ipsum dolor it amet."
	},
	{
		"_id": "6253c8b84d0c24ae67e36103",
		"ethics_id": "6253c8b84d0c24ae67e36112",
		"dateSubmitted": 1647000337214,
		"Respondent": "Elaine Windu",
		"status": "reviewed",
		"dateReviewed": 1647000337214,
		"dateOfTransaction": 1647000337214,
		"giftType": "Gift",
		"externalOrganization": "N/A",
		"costOfTransaction": 1000.00,
		"reasonForGift": "Lorem ipsum dolor it amet."
	}
];

export { formCards, formLibraryData, ethicsData, ethicsAllEntriesData };
