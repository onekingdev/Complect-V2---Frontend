import { createWebHistory, createRouter } from "vue-router";

// layers
// const UnauthenticatedLayer = () => import( "~/layers/Unauthenticated.vue" );
const AuthenticatedLayer = () => import( "~/layers/Authenticated.vue" );

// pages
const Dashboard = () => import( "~/pages/Dashboard/Base.vue" );
const Tasks = () => import( "~/pages/Tasks/Base.vue" );

const Projects = () => import( "~/pages/Projects/Base.vue" );
const MyProjects = () => import( "~/pages/Projects/MyProjects.vue" );
const Contacts = () => import( "~/pages/Projects/Contacts.vue" );
const Ratings = () => import( "~/pages/Projects/Ratings.vue" );

const Policies = () => import( "~/pages/Policies/Base.vue" );
const MyPolicies = () => import( "~/pages/Policies/Policies.vue" );
const PoliciesArchive = () => import( "~/pages/Policies/Archive.vue" );
const PoliciesSetup = () => import( "~/pages/Policies/Setup.vue" );

const Reviews = () => import( "~/pages/Reviews/Base.vue" );
const Risks = () => import( "~/pages/Risks/Base.vue" );

// ––––––––––––––– Routes ––––––––––––––– //
const routes = [{
	path: "/",
	component: AuthenticatedLayer,
	beforeEnter: ( to, from, next ) => {
		const auth = true;
		if ( auth ) next();
		else next({ name: "Login" });
	},
	children: [{
		path: "dashboard",
		name: "Dashboard",
		component: Dashboard
	}, {
		path: "tasks",
		name: "Tasks",
		component: Tasks
	}, {
		path: "projects",
		component: Projects,
		children: [{
			path: "",
			name: "Projects",
			component: MyProjects
		}, {
			path: "contacts",
			name: "Contacts",
			component: Contacts
		}, {
			path: "ratings",
			name: "Ratings",
			component: Ratings
		}]
	}, {
		path: "policies",
		component: Policies,
		children: [{
			path: "",
			name: "Policies",
			component: MyPolicies
		}, {
			path: "archive",
			name: "Policies Archive",
			component: PoliciesArchive
		}, {
			path: "setup",
			name: "Policies Setup",
			component: PoliciesSetup
		}]
	}, {
		path: "reviews",
		name: "Reviews",
		component: Reviews
	}, {
		path: "risks",
		name: "Risks",
		component: Risks
	}, {
		path: "",
		redirect: { name: "Dashboard" }
	}]
}, {
	path: "/:pathMatch(.*)*",
	redirect: { name: "Dashboard" }
}];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
