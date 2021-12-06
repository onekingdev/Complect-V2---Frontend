// devMode
const devInputsEntry = () => import( "~/_devmode/pages/Inputs/InputsEntry.vue" );
const devInputsButtons = () => import( "~/_devmode/pages/Inputs/InputsButtons.vue" );
const devInputsFields = () => import( "~/_devmode/pages/Inputs/InputsFields.vue" );
const devInputsSelect = () => import( "~/_devmode/pages/Inputs/InputsSelect.vue" );
const devInputsCheckbox = () => import( "~/_devmode/pages/Inputs/InputsCheckbox.vue" );

const devInputsExtra = () => import( "~/_devmode/pages/Inputs/InputsExtra.vue" );

const devDataEntry = () => import( "~/_devmode/pages/Data/DataEntry.vue" );
const devDataModel = () => import( "~/_devmode/pages/Data/DataModel.vue" );

const devAdditionalEntry = () => import( "~/_devmode/pages/Additional/AdditionalEntry.vue" );
const devAdditionalToast = () => import( "~/_devmode/pages/Additional/AdditionalToasts.vue" );
const devAdditionalBanners = () => import( "~/_devmode/pages/Additional/AdditionalBanners.vue" );
const devAdditionalAvatars = () => import( "~/_devmode/pages/Additional/AdditionalAvatars.vue" );
const devAdditionalModals = () => import( "~/_devmode/pages/Additional/AdditionalModals.vue" );

const devTableEntry = () => import( "~/_devmode/pages/Table/TableEntry.vue" );
const devTableGeneral = () => import( "~/_devmode/pages/Table/TableGeneral.vue" );


const devRoutes = [{
	path: "/components/inputs",
	component: devInputsEntry,
	meta: { title: "Inputs Components" },
	children: [{
		path: "buttons",
		meta: { title: "Button Component" },
		name: "devInputsButtons",
		component: devInputsButtons
	}, {
		path: "fields",
		meta: { title: "Field Component" },
		name: "devInputsFields",
		component: devInputsFields
	}, {
		path: "select",
		meta: { title: "Select Component" },
		name: "devInputsSelect",
		component: devInputsSelect
	}, {
		path: "checkbox",
		meta: { title: "Checkbox Component" },
		name: "devInputsCheckbox",
		component: devInputsCheckbox
	}, {
		path: "extra",
		meta: { title: "Extra" },
		name: "devInputsExtra",
		component: devInputsExtra
	}, {
		path: "",
		redirect: { name: "devInputsButtons" },
	}]
}, {
	path: "/components/table",
	component: devTableEntry,
	meta: { title: "Table Component" },
	children: [{
		path: "general",
		name: "devTableGeneral",
		component: devTableGeneral
	}, {
		path: "",
		redirect: { name: "devTableGeneral" },
	}]
},{
		path: "/components/data",
		component: devDataEntry,
		meta: { title: "Data" },
		children: [{
			path: "model",
			meta: { title: "Model" },
			name: "devDataModel",
			component: devDataModel
		}, {
			path: "",
			redirect: { name: "devDataModel" },
		}]
	}, {
		path: "/components/additional",
		component: devAdditionalEntry,
		meta: { title: "Additional" },
		children: [{
			path: "toasts",
			meta: { title: "Toasts" },
			name: "devAdditionalToast",
			component: devAdditionalToast
		}, {
			path: "banners",
			meta: { title: "Banners" },
			name: "devAdditionalBanners",
			component: devAdditionalBanners
		}, {
			path: "avatars",
			meta: { title: "Avatars" },
			name: "devAdditionalAvatars",
			component: devAdditionalAvatars
		}, {
			path: "modals",
			meta: { title: "Modals" },
			name: "devAdditionalModals",
			component: devAdditionalModals
		}, {
			path: "",
			redirect: { name: "devAdditionalToast" },
		}]
	}
];

export { devRoutes };
