import { createWebHistory, createRouter } from 'vue-router'
import { useAuthGuard, useOnboardingGuard, useNotOnboardedGuard, businessPagesGuard } from './Guards.js'

import { devRoutes } from '~/_devmode/Routes.js'

// layers
const ErrorLayer = () => import('~/layers/ErrorLayer.vue')
const UnauthenticatedLayer = () => import('~/layers/UnauthenticatedLayer.vue')
const AuthenticatedLayer = () => import('~/layers/AuthenticatedLayer.vue')

const AuthSignUp = () => import('~/pages/Auth/AuthSignUp.vue')
const AuthSignIn = () => import('~/pages/Auth/AuthSignIn.vue')
const AuthResetPassword = () => import('~/pages/Auth/AuthResetPassword.vue')

const _OnboardingEntry = () => import('~/pages/Onboarding/_OnboardingEntry.vue')
const OnboardingForm = () => import('~/pages/Onboarding/OnboardingForm.vue')
const OnboardingCheckout = () => import('~/pages/Onboarding/OnboardingCheckout.vue')

const _PagesEntry = () => import('~/pages/_PagesEntry.vue')
const _DashboardEntry = () => import('~/pages/Dashboard/_DashboardEntry.vue')

// tasks
const _TasksEntry = () => import('~/pages/Tasks/_TasksEntry.vue')
const TasksOverview = () => import('~/pages/Tasks/TasksOverview.vue')

// projects
const _ProjectsEntry = () => import('~/pages/Projects/_ProjectsEntry.vue')
const ProjectsOverview = () => import('~/pages/Projects/ProjectsOverview.vue')
const ProjectsContacts = () => import('~/pages/Projects/ProjectsContacts.vue')
const ProjectsRatings = () => import('~/pages/Projects/ProjectsRatings.vue')
// jobs
const _JobsEntry = () => import('~/pages/Jobs/_JobsEntry.vue')
const JobsOverview = () => import('~/pages/Jobs/JobsOverview.vue')
const JobsContacts = () => import('~/pages/Jobs/JobsContacts.vue')
const JobsRatings = () => import('~/pages/Jobs/JobsRatings.vue')

// project
const _ProjectEntry = () => import('~/pages/Project/_ProjectEntry.vue')
const ProjectDetail = () => import('~/pages/Project/ProjectDetail.vue')
const ProjectTasks = () => import('~/pages/Project/ProjectTasks.vue')
const ProjectDocuments = () => import('~/pages/Project/ProjectDocuments.vue')
const ProjectCollaborators = () => import('~/pages/Project/ProjectCollaborators.vue')
const ProjectPost = () => import('~/pages/Project/ProjectPost.vue')
const ProjectContract = () => import('~/pages/Project/ProjectContract.vue')
const ProjectPostForm = () => import('~/pages/Project/ProjectPostForm.vue')
const ProjectTimesheet = () => import('~/pages/Project/ProjectTimesheet.vue')

// proposal
const ProposalForm = () => import('~/pages/Proposal/ProposalForm.vue')
const ProposalFormView = () => import('~/pages/Proposal/ProposalFormView.vue')

// policies
const _PoliciesEntry = () => import('~/pages/Policies/_PoliciesEntry.vue')
const PoliciesOverview = () => import('~/pages/Policies/PoliciesOverview.vue')
const PoliciesArchive = () => import('~/pages/Policies/PoliciesArchive.vue')
const PoliciesSetup = () => import('~/pages/Policies/PoliciesSetup.vue')
// policy
const _PolicyEntry = () => import('~/pages/Policy/_PolicyEntry.vue')
const PolicyDetail = () => import('~/pages/Policy/PolicyDetail.vue')
const PolicyRisks = () => import('~/pages/Policy/PolicyRisks.vue')
const PolicyTasks = () => import('~/pages/Policy/PolicyTasks.vue')
const PolicyHistory = () => import('~/pages/Policy/PolicyHistory.vue')

// reviews
const _ReviewsEntry = () => import('~/pages/Reviews/_ReviewsEntry.vue')
const ReviewsOverview = () => import('~/pages/Reviews/ReviewsOverview.vue')
// review
const _ReviewEntry = () => import('~/pages/Review/_ReviewEntry.vue')
const ReviewDetail = () => import('~/pages/Review/ReviewDetail.vue')
const ReviewCategory = () => import('~/pages/Review/ReviewCategory.vue')
const ReviewTasks = () => import('~/pages/Review/ReviewTasks.vue')
const ReviewDocuments = () => import('~/pages/Review/ReviewDocuments.vue')

// risks
const _RisksEntry = () => import('~/pages/Risks/_RisksEntry.vue')
const RisksOverview = () => import('~/pages/Risks/RisksOverview.vue')
// risk
const _RiskEntry = () => import('~/pages/Risk/_RiskEntry.vue')
const RiskDetail = () => import('~/pages/Risk/RiskDetail.vue')

// jobs
const _JobBoardEntry = () => import('~/pages/Job/_JobBoardEntry.vue')
const JobBoardDetail = () => import('~/pages/Job/JobBoardDetail.vue')

// expoert
const _ExpertListEntry = () => import('~/pages/Expert/_ExpertListEntry.vue')
const ExpertDetail = () => import('~/pages/Expert/ExpertDetail.vue')

// records
const _RecordsEntry = () => import('~/pages/Records/_RecordsEntry.vue')
const RecordsOverview = () => import('~/pages/Records/RecordsOverview.vue')

// organization
const _OrganizationEntry = () => import('~/pages/Organization/_OrganizationEntry.vue')
const OrganizationOverview = () => import('~/pages/Organization/OrganizationOverview.vue')

// code of ethics
const _EthicsEntries = () => import("~/pages/Ethics/_EthicsEntries.vue")
const EthicsEntries = () => import("~/pages/Ethics/EthicsEntries.vue")
const _EthicsEntry = () => import("~/pages/Ethics/_EthicsEntry.vue")
const EthicsEntry = () => import("~/pages/Ethics/EthicsEntry.vue")
const EthicsSetting = () => import("~/pages/Ethics/EthicsSetting.vue")

// form library
const _FormLibrary = () => import('~/pages/FormLibrary/_FormLibrary.vue')
const _FormLibraryEntry = () => import('~/pages/FormLibrary/_FormLibraryEntry.vue')
const FormLibraryEntry = () => import('~/pages/FormLibrary/FormLibraryEntry.vue')
const FormLibraryNew = () => import('~/pages/FormLibrary/FormLibraryNew.vue')
const _FormEntry = () => import('~/pages/FormLibrary/_FormEntry.vue')
const FormBuilder = () => import('~/pages/FormLibrary/FormBuilder.vue')
const FormPreview = () => import('~/pages/FormLibrary/FormPreview.vue')
const FormSetting = () => import('~/pages/FormLibrary/FormSetting.vue')

// settings
const _SettingsEntry = () => import('~/pages/Settings/_SettingsEntry.vue')
const SettingsGeneral = () => import('~/pages/Settings/SettingsGeneral.vue')
const SettingsUsers = () => import('~/pages/Settings/SettingsUsers.vue')
const SettingsUsersDirectory = () => import('~/pages/Settings/SettingsUsersDirectory.vue')
const SettingsUsersDisabled = () => import('~/pages/Settings/SettingsUsersDisabled.vue')
const SettingsRoles = () => import('~/pages/Settings/SettingsRoles.vue')
const SettingsSecurity = () => import('~/pages/Settings/SettingsSecurity.vue')
const SettingsSubscriptions = () => import('~/pages/Settings/SettingsSubscriptions.vue')
const SettingsBilling = () => import('~/pages/Settings/SettingsBilling.vue')
const SettingsBillingPlan = () => import('~/pages/Settings/SettingsBillingPlan.vue')
const SettingsClientBilling = () => import('~/pages/Settings/SettingsClientBilling.vue')

// profiles
const _ProfileEntry = () => import('~/pages/Profile/_ProfileEntry.vue')
const ProfileAbout = () => import('~/pages/Profile/ProfileAbout.vue')
const ProfileSettings = () => import('~/pages/Profile/ProfileSettings.vue')

// report
const ReportEntry = () => import('~/pages/Reports/ReportEntry.vue')
const ReportOrganizations = () => import('~/pages/Reports/ReportOrganizations.vue')
const ReportRisks = () => import('~/pages/Reports/ReportRisks.vue')
const ReportFinancials = () => import('~/pages/Reports/ReportFinancials.vue')

// exams
const _ExamsEntry = () => import('~/pages/Exams/_ExamsEntry.vue')
const ExamsOverview = () => import('~/pages/Exams/ExamsOverview.vue')
const _ExamEntry = () => import('~/pages/Exam/_ExamEntry.vue')
const ExamDetail = () => import('~/pages/Exam/ExamDetail.vue')
const ExamDetailDocuments = () => import('~/pages/Exam/ExamDetailDocuments.vue')
const ExamDetailTasks = () => import('~/pages/Exam/ExamDetailTasks.vue')
const ExamPortal = () => import('~/pages/Exam/ExamPortal.vue')

// ––––––––––––––– Routes ––––––––––––––– //
const routes = [
  {
    path: '/',
    component: AuthenticatedLayer,
    beforeEnter: useAuthGuard,
    children: [
      {
        path: 'onboarding',
        beforeEnter: useOnboardingGuard,
        component: _OnboardingEntry,
        meta: {
          topbar: 'simple',
          sidebar: false
        },
        children: [
          {
            path: '',
            name: 'OnboardingForm',
            component: OnboardingForm,
            meta: { title: 'Onboarding' }
          }, {
            path: 'checkout',
            name: 'OnboardingCheckout',
            component: OnboardingCheckout,
            meta: { title: 'Checkout' }
          }
        ]
      }, {
        path: '',
        beforeEnter: useNotOnboardedGuard,
        component: _PagesEntry,
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            component: _DashboardEntry,
            meta: { title: 'Dashboard' }
          },
          {
            path: 'tasks',
            component: _TasksEntry,
            meta: { title: 'Tasks' },
            children: [{
              path: '',
              name: 'TasksOverview',
              component: TasksOverview,
              meta: { title: 'Tasks' }
            }]
          },
          {
            path: 'projects',
            component: _ProjectsEntry,
            meta: { title: 'Projects' },
            children: [
              {
                path: '',
                name: 'ProjectsOverview',
                component: ProjectsOverview,
                meta: { title: 'My Projects' }
              }, {
                path: 'contacts',
                name: 'ProjectsContacts',
                component: ProjectsContacts,
                meta: { title: 'Contacts' }
              }, {
                path: 'ratings',
                name: 'ProjectsRatings',
                component: ProjectsRatings,
                meta: { title: 'Ratings and Reviews' }
              }
            ]
          },
          {
            path: 'jobs',
            component: _JobsEntry,
            meta: { title: 'Jobs' },
            children: [
              {
                path: '',
                name: 'JobsOverview',
                component: JobsOverview,
                meta: { title: 'My Jobs' }
              }, {
                path: 'contacts',
                name: 'JobsContacts',
                component: JobsContacts,
                meta: { title: 'Contacts' }
              }, {
                path: 'ratings',
                name: 'JobsRatings',
                component: JobsRatings,
                meta: { title: 'Ratings and Reviews' }
              }
            ]
          },
          {
            path: 'project/new',
            name: 'ProjectPostNew',
            component: ProjectPostForm,
            meta: {
              title: 'Post Job',
              sidebar: false
            }
          },
          {
            path: 'project/new/:id',
            name: 'ProjectPostJob',
            component: ProjectPostForm,
            meta: {
              title: 'Post Job',
              sidebar: false
            }
          },
          {
            path: 'project/edit/:id',
            name: 'ProjectPostEdit',
            component: ProjectPostForm,
            meta: {
              title: 'Edit Job',
              sidebar: false
            }
          },
          {
            path: 'project/:id',
            component: _ProjectEntry,
            meta: {
              title: 'Project',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'ProjectDetail',
                component: ProjectDetail,
                meta: { title: 'Project Detail' }
              },
              {
                path: 'tasks',
                name: 'ProjectTasks',
                component: ProjectTasks,
                meta: { title: 'Project Tasks' }
              },
              {
                path: 'documents',
                name: 'ProjectDocuments',
                component: ProjectDocuments,
                meta: { title: 'Project Documents' }
              },
              {
                path: 'collaborators',
                name: 'ProjectCollaborators',
                component: ProjectCollaborators,
                meta: { title: 'Project Collaborators' }
              },
              {
                path: 'jobpost',
                name: 'ProjectPost',
                component: ProjectPost,
                meta: { title: 'Job Post' }
              },
              {
                path: 'contract',
                name: 'ProjectContract',
                component: ProjectContract,
                meta: { title: 'Project Contract' }
              },
              {
                path: 'timesheets',
                name: 'ProjectTimesheet',
                component: ProjectTimesheet,
                meta: { title: 'Time Sheet' }
              }
            ]
          },
          {
            path: 'policies',
            component: _PoliciesEntry,
            meta: { title: 'Policies' },
            children: [
              {
                path: '',
                name: 'Policies',
                component: PoliciesOverview
              }, {
                path: 'archive',
                name: 'PoliciesArchive',
                component: PoliciesArchive
              }, {
                path: 'setup',
                name: 'PoliciesSetup',
                component: PoliciesSetup
              }
            ]
          },
          {
            path: 'policy/:id',
            component: _PolicyEntry,
            meta: {
              title: 'Policy',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'PolicyDetail',
                component: PolicyDetail,
                meta: { title: 'Policy Detail' }
              }, {
                path: 'risks',
                name: 'PolicyRisks',
                component: PolicyRisks,
                meta: { title: 'Policy Risks' }
              }, {
                path: 'tasks',
                name: 'PolicyTasks',
                component: PolicyTasks,
                meta: { title: 'Policy Tasks' }
              }, {
                path: 'history',
                name: 'PolicyHistory',
                component: PolicyHistory,
                meta: { title: 'Policy History' }
              }
            ]
          },
          {
            path: 'exam_management',
            component: _ExamsEntry,
            children: [{
              path: '',
              name: 'ExamsOverview',
              component: ExamsOverview,
              meta: { title: 'Exam Overview', tab: 'Documents' }
            }]
          },
          {
            path: 'exam_management/:id',
            component: _ExamEntry,
            meta: {
              title: 'Exam Detail',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'ExamDetail',
                component: ExamDetail,
                meta: { title: 'ExamDetail' }
              }, {
                path: 'tasks',
                name: 'ExamDetailTasks',
                component: ExamDetailTasks,
                meta: { title: 'ExamDetailTasks' }
              }, {
                path: 'documents',
                name: 'ExamDetailDocuments',
                component: ExamDetailDocuments,
                meta: { title: 'ExamDetailDocuments' }
              }
            ]
          },
          {
            path: 'exam_management/:id/portal',
            component: ExamPortal,
            name: 'ExamPortal',
            meta: {
              title: 'Exam Portal',
              sidebar: false
            }
          },
          {
            path: 'internal_reviews',
            component: _ReviewsEntry,
            children: [{
              path: '',
              name: 'ReviewsOverview',
              component: ReviewsOverview,
              meta: { title: 'Reviews' }
            }]
          },
          {
            path: 'internal_review/:id',
            component: _ReviewEntry,
            meta: {
              title: 'Review',
              sidebar: false
            },
            children: [
              {
                path: 'details',
                name: 'ReviewDetail',
                component: ReviewDetail,
                meta: { title: 'Review Detail' },
                children: [{
                  path: 'category/:catId',
                  name: 'ReviewCategory',
                  component: ReviewCategory,
                  props: true,
                  meta: { title: 'Review Category' }
                }]
              }, {
                path: 'tasks',
                name: 'ReviewTasks',
                component: ReviewTasks,
                meta: { title: 'Review Tasks' }
              }, {
                path: 'documents',
                name: 'ReviewDocuments',
                component: ReviewDocuments,
                meta: { title: 'Review Documents' }
              }
            ]
          },
          {
            path: 'risks',
            component: _RisksEntry,
            children: [{
              path: '',
              name: 'RisksOverview',
              component: RisksOverview,
              meta: { title: 'Risks' }
            }]
          },
          {
            path: 'risk/:id',
            component: _RiskEntry,
            meta: {
              title: 'Risk',
              sidebar: false
            },
            children: [{
              path: '',
              name: 'RiskDetail',
              component: RiskDetail,
              meta: { title: 'Risk Detail' }
            }]
          },
          {
            path: 'records',
            component: _RecordsEntry,
            children: [{
              path: '',
              name: 'RecordsOverview',
              component: RecordsOverview,
              meta: { title: 'Records', tab: 'Documents' }
            }]
          },
          {
            path: 'organization',
            component: _OrganizationEntry,
            children: [{
              path: '',
              name: 'OrganizationOverview',
              component: OrganizationOverview,
              meta: { title: 'Organization', tab: 'Reports' }
            }]
          },
          {
            path: 'job_board',
            name: 'JobBoard',
            component: _JobBoardEntry,
            meta: {
              title: 'Job Board',
              sidebar: false
            },
            children: [{
              path: ':id',
              name: 'JobBoardDetail',
              component: JobBoardDetail,
              meta: { title: 'Job Board Detail' }
            }]
          },
          {
            path: 'job_board/:id',
            component: ProposalForm,
            meta: { sidebar: false },
            children: [
              {
                path: 'applications/new',
                name: 'ProposalNew',
                component: ProposalForm,
                meta: { title: 'Job Board Detail' }
              }, {
                path: 'applications/edit',
                name: 'ProposalEdit',
                component: ProposalForm,
                meta: { title: 'Job Board Detail' }
              }
            ]
          },
          {
            path: 'job_board/:id/:specialist_id/view',
            name: 'ProposalView',
            component: ProposalFormView,
            meta: { sidebar: false }
          },
          {
            path: 'specialistmarketplace',
            name: 'ExpertList',
            component: _ExpertListEntry,
            meta: {
              title: 'Specialist Market',
              sidebar: false
            }
          },
          {
            path: 'specialist-profile/:id',
            name: 'ExpertDetail',
            component: ExpertDetail,
            meta: {
              title: 'Specialist Profile',
              sidebar: false
            }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: _ProfileEntry,
            meta: {
              title: 'Profile',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'ProfileAbout',
                component: ProfileAbout
              }, {
                path: 'settings',
                meta: { title: 'Profile - Settings' },
                name: 'ProfileSettings',
                component: ProfileSettings
              }
            ]
          },
          {
            path: 'reports',
            name: 'Report',
            component: ReportEntry,
            meta: {
              title: 'Report',
              tab: 'Reports',
              sidebar: true
            },
            children: [
              {
                path: 'organizations',
                name: 'ReportOrganizations',
                component: ReportOrganizations,
                beforeEnter: businessPagesGuard
              }, {
                path: 'risks',
                name: 'ReportRisks',
                component: ReportRisks,
                beforeEnter: businessPagesGuard
              }, {
                path: 'financials',
                name: 'ReportFinancials',
                component: ReportFinancials
              }
            ]
          },
          {
            path: 'billplan',
            name: 'BillingPlan',
            component: SettingsBillingPlan,
            meta: {
              title: 'Plan',
              sidebar: false
            }
          },
          {
            path: 'clientbill',
            name: 'ClientBill',
            component: SettingsClientBilling,
            meta: {
              title: 'Plan',
              sidebar: false
            }
          },
          {
            path: 'ethicsEntries',
            component: _EthicsEntries,
            meta: { title: 'Ethics Entries' },
            children: [{
              path: '',
              meta: { title: 'Code Of Ethics' },
              name: 'EthicsEntries',
              component: EthicsEntries
            }]
          },
          {
            path: 'ethics/:id',
            component: _EthicsEntry,
            meta: {
              title: 'Ethics Entry',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'EthicsEntry',
                component: EthicsEntry,
                meta: { title: 'Ethics Entry' }
              }, {
                path: 'setting',
                name: 'EthicsSetting',
                component: EthicsSetting,
                meta: { title: 'Ethics Setting' }
              }
            ]
          },
          {
            path: 'formLibrary',
            name: 'FormLibrary',
            component: _FormLibrary,
            meta: { title: 'Form Library' }
          },
          {
            path: 'formEntry',
            component: _FormLibraryEntry,
            meta: { title: 'Form Entry' },
            children: [
              {
                path: '',
                meta: { title: 'Form Library' },
                name: 'FormLibraryEntry',
                component: FormLibraryEntry
              }, {
                path: 'new',
                meta: { title: 'New Form' },
                name: 'FormLibraryNew',
                component: FormLibraryNew
              }
            ]
          },
          {
            path: 'form/:id',
            component: _FormEntry,
            meta: {
              title: 'Form Entry',
              sidebar: false
            },
            children: [
              {
                path: '',
                name: 'FormBuilder',
                component: FormBuilder,
                meta: { title: 'Form Builder' }
              }, {
                path: 'preview',
                name: 'FormPreview',
                component: FormPreview,
                meta: { title: 'Form Preview' }
              }, {
                path: 'setting',
                name: 'FormSetting',
                component: FormSetting,
                meta: { title: 'Form Setting' }
              }
            ]
          },
          {
            path: 'settings',
            component: _SettingsEntry,
            meta: {
              title: 'Settings',
              sidebar: false
            },
            children: [
              {
                path: 'general',
                meta: { title: 'Settings - General' },
                name: 'SettingsGeneral',
                component: SettingsGeneral
              },
              {
                path: 'users',
                meta: { title: 'Settings - Users' },
                component: SettingsUsers,
                children: [
                  {
                    path: '',
                    name: 'SettingsUsersDirectory',
                    component: SettingsUsersDirectory
                  }, {
                    path: 'disabled',
                    name: 'SettingsUsersDisabled',
                    component: SettingsUsersDisabled,
                    meta: { title: 'Settings - Disabled Users' }
                  }
                ]
              },
              {
                path: 'roles',
                meta: { title: 'Settings - Roles' },
                name: 'SettingsRoles',
                component: SettingsRoles
              },
              {
                path: 'security',
                meta: { title: 'Settings - Security' },
                name: 'SettingsSecurity',
                component: SettingsSecurity
              },
              {
                path: 'subscriptions',
                meta: { title: 'Settings - Subscriptions' },
                name: 'SettingsSubscriptions',
                component: SettingsSubscriptions
              },
              {
                path: 'billing',
                meta: { title: 'Settings - Billing' },
                name: 'SettingsBilling',
                component: SettingsBilling
              },
              {
                path: '',
                redirect: { name: 'SettingsGeneral' }
              }
            ]
          },
          {
            path: '',
            redirect: { name: 'Dashboard' }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: UnauthenticatedLayer,
    children: [
      {
        path: 'sign-up',
        name: 'AuthSignUp',
        component: AuthSignUp,
        meta: { title: 'Sign Up' }
      }, {
        path: 'sign-in',
        name: 'AuthSignIn',
        component: AuthSignIn,
        meta: { title: 'Sign In' }
      }, {
        path: 'reset-password',
        name: 'AuthResetPassword',
        component: AuthResetPassword,
        meta: { title: 'Reset Password' }
      }
    ]
  },
  {
    path: '/error',
    name: 'ErrorLayer',
    component: ErrorLayer,
    props: {
      code: 404,
      title: 'No page found',
      message: 'The page you are looking for is either missing of can\'t be found.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'ErrorLayer' }
  },
  {
    path: '/unauthorized',
    component: ErrorLayer,
    props: { code: 401, title: 'Unauthorized access', message: 'The page you are looking for requires different authentication credentials' }
  }
]

if (import.meta.env.VITE_STAGE === 'dev') routes[1].children.push(...devRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Complect`
  next()
})

export default router
