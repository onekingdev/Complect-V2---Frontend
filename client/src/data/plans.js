const plans = {
	"specialist": [
		{
			"key": "standard",
			"title": "Standard",
			"intro": "Try out our product for free!",
			"price": [0],
			"benefits": [
				"Compliance Calendar", "Project Management"
			]
		}, {
			"key": "full-access",
			"title": "All Access Membership",
			"intro": "Full access to all features and resources",
			"price": [400],
			"benefits": [
				"Compliance Calendar",
				"Project Management",
				"Job Board",
				"Specialist Marketplace Profile",
				"Automated Billing",
				"Client Account Access"
			]
		}
	],
	"business": [
		{
			"key": "starter",
			"title": "Starter",
			"intro": "Try out our product for free!",
			"price": [0],
			"users": ["1 admin user"],
			"benefits": [
				"Compliance Calendar", "Project Management"
			]
		}, {
			"key": "team",
			"title": "Team",
			"intro": "Small teams and startups",
			"price": [
				125, 150
			],
			"users": [
				"3 free users plus $120/year per person", "3 free users plus $15/mo per person"
			],
			"benefits": [
				"Compliance Calendar",
				"Project Management",
				"Policies and Procedures",
				"<b>1</b> Internal Review per year",
				"Exam Management",
				"<b>5GB</b> storage for books and records"
			]
		}, {
			"key": "business",
			"title": "Business",
			"intro": "Medium-sized organizations",
			"price": [
				210, 250
			],
			"users": [
				"10 free users plus $120/year per person", "10 free users plus $15/mo per person"
			],
			"benefits": [
				"Compliance Calendar",
				"Project Management",
				"Policies and Procedures",
				"<b>Unlimited</b> Internal Reviews",
				"Exam Management",
				"Auditor Portal",
				"<b>10GB</b> storage for books and records",
				"<b>Free</b> personalized onboarding"
			]
		}
	]
};

export { plans };
