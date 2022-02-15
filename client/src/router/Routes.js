import { createWebHistory, createRouter } from "vue-router";
import { useAuthGuard, useOnboardingGuard, useAppPagesGuard } from "./Guards.js";

// layers
const ErrorLayer = () => import( "~/layers/ErrorLayer.vue" );
const UnauthenticatedLayer = () => import( "~/layers/UnauthenticatedLayer.vue" );
const AuthenticatedLayer = () => import( "~/layers/AuthenticatedLayer.vue" );

const AuthSignUp = () => import( "~/pages/Auth/AuthSignUp.vue" );
const AuthSignIn = () => import( "~/pages/Auth/AuthSignIn.vue" );
const AuthVerification = () => import( "~/pages/Auth/AuthVerification.vue" );
const AuthResetPassword = () => import( "~/pages/Auth/AuthResetPassword.vue" );

const _OnboardingEntry = () => import( "~/pages/Onboarding/_OnboardingEntry.vue" );
const OnboardingForm = () => import( "~/pages/Onboarding/OnboardingForm.vue" );
const OnboardingCheckout = () => import( "~/pages/Onboarding/OnboardingCheckout.vue" );

const _PagesEntry = () => import( "~/pages/_PagesEntry.vue" );
const _DashboardEntry = () => import( "~/pages/Dashboard/_DashboardEntry.vue" );


// tasks
const _TasksEntry = () => import( "~/pages/Tasks/_TasksEntry.vue" );
const TasksOverview = () => import( "~/pages/Tasks/TasksOverview.vue" );


// projects
const _ProjectsEntry = () => import( "~/pages/Projects/_ProjectsEntry.vue" );
const ProjectsOverview = () => import( "~/pages/Projects/ProjectsOverview.vue" );
const ProjectsContacts = () => import( "~/pages/Projects/ProjectsContacts.vue" );
const ProjectsRatings = () => import( "~/pages/Projects/ProjectsRatings.vue" );
// project
const _ProjectEntry = () => import( "~/pages/Project/_ProjectEntry.vue" );
const ProjectDetail = () => import( "~/pages/Project/ProjectDetail.vue" );
const ProjectTasks = () => import( "~/pages/Project/ProjectTasks.vue" );
const ProjectDocuments = () => import( "~/pages/Project/ProjectDocuments.vue" );
const ProjectCollaborators = () => import( "~/pages/Project/ProjectCollaborators.vue" );
const ProjectPost = () => import( "~/pages/Project/ProjectPost.vue" );


// policies
const _PoliciesEntry = () => import( "~/pages/Policies/_PoliciesEntry.vue" );
const PoliciesOverview = () => import( "~/pages/Policies/PoliciesOverview.vue" );
const PoliciesArchive = () => import( "~/pages/Policies/PoliciesArchive.vue" );
const PoliciesSetup = () => import( "~/pages/Policies/PoliciesSetup.vue" );


// reviews
const _ReviewsEntry = () => import( "~/pages/Reviews/_ReviewsEntry.vue" );
const ReviewsOverview = () => import( "~/pages/Reviews/ReviewsOverview.vue" );
// review
const _ReviewEntry = () => import( "~/pages/Review/_ReviewEntry.vue" );
const ReviewDetail = () => import( "~/pages/Review/ReviewDetail.vue" );
const ReviewCategory = () => import( "~/pages/Review/ReviewCategory.vue" );
const ReviewTasks = () => import( "~/pages/Review/ReviewTasks.vue" );
const ReviewDocuments = () => import( "~/pages/Review/ReviewDocuments.vue" );


// risks
const _RisksEntry = () => import( "~/pages/Risks/_RisksEntry.vue" );
const RisksOverview = () => import( "~/pages/Risks/RisksOverview.vue" );
// risk
const _RiskEntry = () => import( "~/pages/Risk/_RiskEntry.vue" );
const RiskDetail = () => import( "~/pages/Risk/RiskDetail.vue" );


// settings
const _SettingsEntry = () => import( "~/pages/Settings/_SettingsEntry.vue" );
const SettingsGeneral = () => import( "~/pages/Settings/SettingsGeneral.vue" );
const SettingsUsers = () => import( "~/pages/Settings/SettingsUsers.vue" );
const SettingsUsersDirectory = () => import( "~/pages/Settings/SettingsUsersDirectory.vue" );
const SettingsUsersDisabled = () => import( "~/pages/Settings/SettingsUsersDisabled.vue" );
const SettingsRoles = () => import( "~/pages/Settings/SettingsRoles.vue" );
const SettingsSecurity = () => import( "~/pages/Settings/SettingsSecurity.vue" );
const SettingsSubscriptions = () => import( "~/pages/Settings/SettingsSubscriptions.vue" );
const SettingsBilling = () => import( "~/pages/Settings/SettingsBilling.vue" );


const _ProfileEntry = () => import( "~/pages/Profile/_ProfileEntry.vue" );
import { devRoutes } from "~/_devmode/Routes.js";

// ––––––––––––––– Routes ––––––––––––––– //
const routes = [
	{
		"path": "/error",
		"name": "ErrorLayer",
		"props": true,
		"component": ErrorLayer,
		"meta": { "title": "Error" }
	}, {
		"path": "/",
		"component": AuthenticatedLayer,
		"beforeEnter": useAuthGuard,
		"children": [
			{
				"path": "onboarding",
				"beforeEnter": useOnboardingGuard,
				"component": _OnboardingEntry,
				"meta": {
					"topbar": "simple",
					"sidebar": false
				},
				"children": [
					{
						"path": "",
						"name": "OnboardingForm",
						"component": OnboardingForm,
						"meta": { "title": "Onboarding" }
					}, {
						"path": "checkout",
						"name": "OnboardingCheckout",
						"component": OnboardingCheckout,
						"meta": { "title": "Checkout" }
					}
				]
			}, {
				"path": "",
				"beforeEnter": useAppPagesGuard,
				"component": _PagesEntry,
				"children": [
					{
						"path": "dashboard",
						"name": "Dashboard",
						"component": _DashboardEntry,
						"meta": { "title": "Dashboard" }
					},
					{
						"path": "tasks",
						"component": _TasksEntry,
						"meta": { "title": "Tasks" },
						"children": [{
							"path": "",
							"name": "TasksOverview",
							"component": TasksOverview,
							"meta": { "title": "Tasks" }
						}]
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
						"path": "project/new",
						"name": "ProjectPost",
						"component": ProjectPost,
						"meta": {
							"title": "Post Project",
							"sidebar": false
						}
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
								"name": "PoliciesArchive",
								"component": PoliciesArchive
							}, {
								"path": "setup",
								"name": "PoliciesSetup",
								"component": PoliciesSetup
							}
						]
					},
					{
						"path": "internal_reviews",
						"component": _ReviewsEntry,
						"children": [{
							"path": "",
							"name": "ReviewsOverview",
							"component": ReviewsOverview,
							"meta": { "title": "Reviews" }
						}]
					},
					{
						"path": "internal_review/:id",
						"component": _ReviewEntry,
						"meta": {
							"title": "Review",
							"sidebar": false
						},
						"children": [
							{
								"path": "",
								"name": "ReviewDetail",
								"component": ReviewDetail,
								"meta": { "title": "Review Detail" },
								"children": [{
									"path": "category/:catId",
									"name": "ReviewCategory",
									"component": ReviewCategory,
									"props": true,
									"meta": { "title": "Review Category" }
								}]
							}, {
								"path": "tasks",
								"name": "ReviewTasks",
								"component": ReviewTasks,
								"meta": { "title": "Review Tasks" }
							}, {
								"path": "documents",
								"name": "ReviewDocuments",
								"component": ReviewDocuments,
								"meta": { "title": "Review Documents" }
							}
						]
					},
					{
						"path": "risks",
						"component": _RisksEntry,
						"children": [{
							"path": "",
							"name": "RisksOverview",
							"component": RisksOverview,
							"meta": { "title": "Risks" }
						}]
					},
					{
						"path": "risk/:id",
						"component": _RiskEntry,
						"meta": {
							"title": "Risk",
							"sidebar": false
						},
						"children": [{
							"path": "",
							"name": "RiskDetail",
							"component": RiskDetail,
							"meta": { "title": "Risk Detail" }
						}]
					},
					{
						"path": "profile",
						"name": "Profile",
						"component": _ProfileEntry,
						"meta": {
							"title": "Profile",
							"sidebar": false
						}
					},
					{
						"path": "settings",
						"component": _SettingsEntry,
						"meta": {
							"title": "Settings",
							"sidebar": false
						},
						"children": [
							{
								"path": "general",
								"meta": { "title": "Settings - General" },
								"name": "SettingsGeneral",
								"component": SettingsGeneral
							},
							{
								"path": "users",
								"meta": { "title": "Settings - Users" },
								"component": SettingsUsers,
								"children": [
									{
										"path": "",
										"name": "SettingsUsersDirectory",
										"component": SettingsUsersDirectory
									}, {
										"path": "disabled",
										"name": "SettingsUsersDisabled",
										"component": SettingsUsersDisabled,
										"meta": { "title": "Settings - Disabled Users" }
									}
								]
							},
							{
								"path": "roles",
								"meta": { "title": "Settings - Roles" },
								"name": "SettingsRoles",
								"component": SettingsRoles
							},
							{
								"path": "security",
								"meta": { "title": "Settings - Security" },
								"name": "SettingsSecurity",
								"component": SettingsSecurity
							},
							{
								"path": "subscriptions",
								"meta": { "title": "Settings - Subscriptions" },
								"name": "SettingsSubscriptions",
								"component": SettingsSubscriptions
							},
							{
								"path": "billing",
								"meta": { "title": "Settings - Billing" },
								"name": "SettingsBilling",
								"component": SettingsBilling
							},
							{
								"path": "",
								"redirect": { "name": "SettingsGeneral" }
							}
						]
					},
					{
						"path": "",
						"redirect": { "name": "Dashboard" }
					}
				]
			}
		]
	}, {
		"path": "/",
		"component": UnauthenticatedLayer,
		"children": [
			{
				"path": "sign-up",
				"name": "AuthSignUp",
				"component": AuthSignUp,
				"meta": { "title": "Sign Up" }
			}, {
				"path": "sign-in",
				"name": "AuthSignIn",
				"component": AuthSignIn,
				"meta": { "title": "Sign In" }
			}, {
				"path": "verification",
				"name": "AuthVerification",
				"component": AuthVerification,
				"meta": { "title": "Verification" }
			}, {
				"path": "reset-password",
				"name": "AuthResetPassword",
				"component": AuthResetPassword,
				"meta": { "title": "Reset Password" }
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


if ( import.meta.env.VITE_STAGE === "dev" ) routes[1].children.push( ...devRoutes );

const router = createRouter({
	"history": createWebHistory(),
	routes
});

router.beforeEach( ( to, from, next ) => {
	document.title = `${to.meta.title} | Complect`;
	next();
});

export default router;
