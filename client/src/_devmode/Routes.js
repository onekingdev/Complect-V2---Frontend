// devMode
const devInputsEntry = () => import( "~/_devmode/pages/Inputs/InputsEntry.vue" );
const devInputsButtons = () => import( "~/_devmode/pages/Inputs/InputsButtons.vue" );
const devInputsFields = () => import( "~/_devmode/pages/Inputs/InputsFields.vue" );
const devInputsExtra = () => import( "~/_devmode/pages/Inputs/InputsExtra.vue" );

const devDataEntry = () => import( "~/_devmode/pages/Data/DataEntry.vue" );
const devDataModel = () => import( "~/_devmode/pages/Data/DataModel.vue" );

const devAdditionalEntry = () => import( "~/_devmode/pages/Additional/AdditionalEntry.vue" );
const devAdditionalToast = () => import( "~/_devmode/pages/Additional/AdditionalToasts.vue" );
const devAdditionalBanners = () => import( "~/_devmode/pages/Additional/AdditionalBanners.vue" );
const devAdditionalAvatars = () => import( "~/_devmode/pages/Additional/AdditionalAvatars.vue" );
const devAdditionalModals = () => import( "~/_devmode/pages/Additional/AdditionalModals.vue" );


const devRoutes = [{
	path: "/components/inputs",
	component: devInputsEntry,
	meta: { title: "Inputs" },
	children: [{
		path: "buttons",
		meta: { title: "Buttons" },
		name: "devInputsButtons",
		component: devInputsButtons
	}, {
		path: "fields",
		meta: { title: "Fields" },
		name: "devInputsFields",
		component: devInputsFields
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
