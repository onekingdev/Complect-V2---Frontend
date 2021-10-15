const tasks = {
	columns: {
		name: "Name",
		linked: "Linked",
		assignee: "Assignee",
		starts: "Start Date",
		ends: "Due Date"
	},
	set: [{
		name: "Task 1",
		linked: "Awesome Project",
		assignee: "Specialist Pro",
		starts: 1634308929856,
		ends: 1634419999856
	}, {
		name: "Task 2",
		linked: "Awesome Project",
		assignee: "Specialist Pro",
		starts: 1634419999856,
		ends: 1635419999856
	}, {
		name: "Task 3",
		linked: "Buy Milk",
		assignee: "Specialist Pro",
		starts: 1634308929856,
		ends: 1634308999856
	}]
};

const projects = {
	columns: {
		name: "Name",
		collaborators: "Collaborators",
		tasks: "Tasks Left",
		cost: "Cost",
		status: "Status",
		starts: "Start Date",
		ends: "End Date"
	},
	set: [{
		project_id: 1,
		business_id: 1,
		name: "Awesome Project",
		description: "Project Description",
		created: 1634308919856,
		starts: 1634308929856,
		ends: 1634419999856,
		status: "inprogress",
		cost: 500,
		tasks: 4,
		collaborators: null
	}, {
		project_id: 2,
		business_id: 1,
		name: "New Super Job",
		description: "Project Description",
		created: 1634308919856,
		starts: 1634419999856,
		ends: 1635419999856,
		status: "draft",
		cost: 1001,
		tasks: 0,
		collaborators: null
	}, {
		project_id: 3,
		business_id: 2,
		name: "Buy Milk",
		description: "Project Description",
		created: 1634308919856,
		starts: 1634308929856,
		ends: 1634308999856,
		status: "complete",
		cost: 2,
		tasks: 1,
		collaborators: null
	}]
};

const contacts = {
	columns: {
		name: "Name",
		location: "Location",
		status: "Status",
		rating: "Rating"
	},
	set: [{
		name: "Specialist Pro",
		location: "London, UK",
		status: "available",
		rating: 4
	}, {
		name: "New Specialist",
		location: "Los Angeles, USA",
		status: "available",
		rating: 5
	}]
};

const policies = {
	columns: {
		name: "Name",
		status: "Status",
		modified: "Last Modified",
		created: "Date Created"
	},
	set: []
};

const reviews = {
	columns: {
		name: "Name",
		progress: "Progress",
		findings: "Findings",
		modified: "Last Modified",
		created: "Date Created",
		review_end: "Review Period End Date"
	},
	set: []
};

const risks = {
	columns: {
		name: "Name",
		impact: "Impact",
		likelihood: "Likelihood",
		level: "Risk Level",
		created: "Date Created"
	},
	set: []
};
export default function useData () {
	return {
		tasks,
		projects,
		contacts,
		policies,
		reviews,
		risks
	};
}
