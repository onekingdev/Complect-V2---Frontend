const topbarNavigation = [
	{ "title": "Home" }, { "title": "Documents" }, { "title": "Reports" }
];

const sidebarNavigation = [
	{
		"title": "Overview",
		"icon": "list-outline",
		"links": [
			{
				"title": "Dashboard",
				"view": "Dashboard"
			}, {
				"title": "Tasks",
				"view": "Tasks"
			}, {
				"title": "Projects",
				"view": "Projects"
			}
		]
	}, {
		"title": "Program Management",
		"icon": "document",
		"links": [
			{
				"title": "Policies and Procedures",
				"view": "Policies"
			}, {
				"title": "Internal Reviews",
				"view": "Reviews"
			}, {
				"title": "Risk Register",
				"view": "Risks"
			}
		]
	}
	// {
	// 	"title": "Components",
	// 	"icon": "components",
	// 	"links": [
	// 		{
	// 			"title": "Inputs",
	// 			"view": "cButtons"
	// 		}, {
	// 			"title": "Data",
	// 			"view": "cModel"
	// 		}
	// 	]
	// }
];

export default function useNavigation () {
	return {
		topbarNavigation,
		sidebarNavigation
	};
}
