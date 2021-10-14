import { createWebHistory, createRouter } from "vue-router";


// layers
// const UnauthenticatedLayer = () => import( "~/layers/Unauthenticated.vue" );
const AuthenticatedLayer = () => import( "~/layers/Authenticated.vue" );

// views
const Empty = () => import( "~/views/Empty.vue" );
const Dashboard = () => import( "~/views/Dashboard.vue" );
const Tasks = () => import( "~/views/Tasks.vue" );
const Projects = () => import( "~/views/Projects.vue" );
const Policies = () => import( "~/views/Policies.vue" );
const Reviews = () => import( "~/views/Reviews.vue" );
const Risks = () => import( "~/views/Risks.vue" );


// ––––––––––––––– Routes ––––––––––––––– //
const routes = [{
	path: "/empty/",
	name: "Empty",
	component: Empty
}, {
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
		name: "Projects",
		component: Projects
	}, {
		path: "policies",
		name: "Policies",
		component: Policies
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
	redirect: { name: "Empty" }
}];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
