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
				"view": "TasksOverview"
			}, {
				"title": "Projects",
				"view": "ProjectsOverview"
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
	}, {
		"title": "Components",
		"icon": "components",
		"links": [
			{
				"title": "Inputs",
				"view": "devInputsButtons"
			}, {
				"title": "Data",
				"view": "devDataModel"
			}, {
				"title": "Additional",
				"view": "devAdditionalToast"
			}
		]
	}
];

export default function useNavigation () {
	return {
		topbarNavigation,
		sidebarNavigation
	};
}
