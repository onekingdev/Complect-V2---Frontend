import { createWebHistory, createRouter } from "vue-router";

// layers
const ErrorLayer = () => import( "~/layers/ErrorLayer.vue" );
// const UnauthenticatedLayer = () => import( "~/layers/UnauthenticatedLayer.vue" );
const AuthenticatedLayer = () => import( "~/layers/AuthenticatedLayer.vue" );


const Dashboard = () => import( "~/pages/Dashboard/Dashboard.vue" );

const _TasksEntry = () => import( "~/pages/Tasks/_TasksEntry.vue" );
const TasksOverview = () => import( "~/pages/Tasks/TasksOverview.vue" );

const _ProjectsEntry = () => import( "~/pages/Projects/_ProjectsEntry.vue" );
const ProjectsOverview = () => import( "~/pages/Projects/ProjectsOverview.vue" );
const ProjectsContacts = () => import( "~/pages/Projects/ProjectsContacts.vue" );
const ProjectsRatings = () => import( "~/pages/Projects/ProjectsRatings.vue" );

const _ProjectEntry = () => import( "~/pages/Project/_ProjectEntry.vue" );
const ProjectDetail = () => import( "~/pages/Project/ProjectDetail.vue" );
const ProjectTasks = () => import( "~/pages/Project/ProjectTasks.vue" );
const ProjectDocuments = () => import( "~/pages/Project/ProjectDocuments.vue" );
const ProjectCollaborators = () => import( "~/pages/Project/ProjectCollaborators.vue" );


const _PoliciesEntry = () => import( "~/pages/Policies/_PoliciesEntry.vue" );
const PoliciesOverview = () => import( "~/pages/Policies/PoliciesOverview.vue" );
const PoliciesArchive = () => import( "~/pages/Policies/PoliciesArchive.vue" );
const PoliciesSetup = () => import( "~/pages/Policies/PoliciesSetup.vue" );

const _ReviewsEntry = () => import( "~/pages/Reviews/_ReviewsEntry.vue" );
const _RisksEntry = () => import( "~/pages/Risks/_RisksEntry.vue" );

const Profile = () => import( "~/pages/Profile/Profile.vue" );


import { devRoutes } from "~/_devmode/Routes.js";

// ––––––––––––––– Routes ––––––––––––––– //
const routes = [
	{
		"path": "/error",
		"name": "ErrorLayer",
		"props": true,
		"component": ErrorLayer
	}, {
		"path": "/",
		"component": AuthenticatedLayer,
		"beforeEnter": ( to, from, next ) => {
			const auth = true;
			if ( auth ) next();
			else next({ "name": "Login" });
		},
		"children": [
			...devRoutes,
			{
				"path": "dashboard",
				"name": "Dashboard",
				"component": Dashboard,
				"meta": { "title": "Dashboard" }
			},
			{
				"path": "tasks",
				"component": _TasksEntry,
				"meta": { "title": "Tasks" },
				"children": [
					{
						"path": "",
						"name": "TasksOverview",
						"component": TasksOverview,
						"meta": { "title": "Tasks" }
					}
				]
			},
			{
				"path": "projects",
				"component": _ProjectsEntry,
				"meta": { "title": "Projects" },
				"children": [
					{
						"path": "",
						"name": "ProjectsOverview",
						"component": ProjectsOverview,
						"meta": { "title": "My Projects" }
					}, {
						"path": "contacts",
						"name": "ProjectsContacts",
						"component": ProjectsContacts,
						"meta": { "title": "Contacts" }
					}, {
						"path": "ratings",
						"name": "ProjectsRatings",
						"component": ProjectsRatings,
						"meta": { "title": "Ratings and Reviews" }
					}
				]
			},
			{
				"path": "project/:id",
				"component": _ProjectEntry,
				"meta": {
					"title": "Project",
					"sidebar": false
				},
				"children": [
					{
						"path": "",
						"name": "ProjectDetail",
						"component": ProjectDetail,
						"meta": { "title": "Project Detail" }
					}, {
						"path": "tasks",
						"name": "ProjectTasks",
						"component": ProjectTasks,
						"meta": { "title": "Project Tasks" }
					}, {
						"path": "documents",
						"name": "ProjectDocuments",
						"component": ProjectDocuments,
						"meta": { "title": "Project Documents" }
					}, {
						"path": "collaborators",
						"name": "ProjectCollaborators",
						"component": ProjectCollaborators,
						"meta": { "title": "Project Collaborators" }
					}
				]
			},
			{
				"path": "policies",
				"component": _PoliciesEntry,
				"meta": { "title": "Policies" },
				"children": [
					{
						"path": "",
						"name": "Policies",
						"component": PoliciesOverview
					}, {
						"path": "archive",
						"name": "Policies Archive",
						"component": PoliciesArchive
					}, {
						"path": "setup",
						"name": "Policies Setup",
						"component": PoliciesSetup
					}
				]
			},
			{
				"path": "reviews",
				"name": "Reviews",
				"component": _ReviewsEntry,
				"meta": { "title": "Reviews" }
			},
			{
				"path": "risks",
				"name": "Risks",
				"component": _RisksEntry,
				"meta": { "title": "Risks" }
			},
			{
				"path": "profile",
				"name": "Profile",
				"component": Profile,
				"meta": {
					"title": "Profile",
					"sidebar": false
				}
			},
			{
				"path": "",
				"redirect": { "name": "Dashboard" }
			}
		]
	}, {
		"path": "/:pathMatch(.*)*",
		"redirect": {
			"name": "ErrorLayer",
			"params": {
				"code": 404,
				"title": "No page found",
				"message": "The page you are looking for is either missing of can't be found."
			}
		}
	}
];


const router = createRouter({
	"history": createWebHistory(),
	routes
});

router.beforeEach( ( to, from, next ) => {
	document.title = `${to.meta.title} | Complect`;
	next();
});

export default router;
