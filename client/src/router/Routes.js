import { createWebHistory, createRouter } from "vue-router";

// layers
const ErrorLayer = () => import( "~/layers/ErrorLayer.vue" );
// const UnauthenticatedLayer = () => import( "~/layers/UnauthenticatedLayer.vue" );
const AuthenticatedLayer = () => import( "~/layers/AuthenticatedLayer.vue" );

// pages
const Dashboard = () => import( "~/pages/Dashboard/Base.vue" );
const Tasks = () => import( "~/pages/Tasks/Base.vue" );

const Projects = () => import( "~/pages/Projects/Base.vue" );

const MyProjects = () => import( "~/pages/Projects/MyProjects.vue" );
const Contacts = () => import( "~/pages/Projects/Contacts.vue" );
const Ratings = () => import( "~/pages/Projects/Ratings.vue" );

const ProjectBase = () => import( "~/pages/Project/ProjectBase.vue" );
const ProjectDetail = () => import( "~/pages/Project/ProjectDetail.vue" );
const ProjectTasks = () => import( "~/pages/Project/ProjectTasks.vue" );
const ProjectDocuments = () => import( "~/pages/Project/ProjectDocuments.vue" );
const ProjectCollaborators = () => import( "~/pages/Project/ProjectCollaborators.vue" );


const Policies = () => import( "~/pages/Policies/Base.vue" );
const MyPolicies = () => import( "~/pages/Policies/Policies.vue" );
const PoliciesArchive = () => import( "~/pages/Policies/Archive.vue" );
const PoliciesSetup = () => import( "~/pages/Policies/Setup.vue" );

const Reviews = () => import( "~/pages/Reviews/Base.vue" );
const Risks = () => import( "~/pages/Risks/Base.vue" );

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
				"name": "Tasks",
				"component": Tasks,
				"meta": { "title": "Tasks" }
			},
			{
				"path": "projects",
				"component": Projects,
				"meta": { "title": "Projects" },
				"children": [
					{
						"path": "",
						"name": "Projects",
						"component": MyProjects
					}, {
						"path": "contacts",
						"name": "Contacts",
						"component": Contacts
					}, {
						"path": "ratings",
						"name": "Ratings",
						"component": Ratings
					}
				]
			},
			{
				"path": "project/:id",
				"component": ProjectBase,
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
			// {
			// 	"path": "projects/:id",
			// 	"name": "Project",
			// 	"component": Project,
			// 	"meta": { "title": "Project", "sidebar": false },
			// },
			{
				"path": "policies",
				"component": Policies,
				"meta": { "title": "Policies" },
				"children": [
					{
						"path": "",
						"name": "Policies",
						"component": MyPolicies
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
				"component": Reviews,
				"meta": { "title": "Reviews" }
			},
			{
				"path": "risks",
				"name": "Risks",
				"component": Risks,
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
