// devMode
const cInputs = () => import( "~/_devmode/pages/Inputs/Base.vue" );
const cButtons = () => import( "~/_devmode/pages/Inputs/Buttons.vue" );
const cFields = () => import( "~/_devmode/pages/Inputs/Fields.vue" );
const cExtra = () => import( "~/_devmode/pages/Inputs/Extra.vue" );

const cData = () => import( "~/_devmode/pages/Data/Base.vue" );
const cModel = () => import( "~/_devmode/pages/Data/Model.vue" );

const devRoutes = [{
	path: "/components/inputs",
	component: cInputs,
	meta: { title: "Inputs" },
	children: [{
		path: "",
		name: "cButtons",
		component: cButtons
	}, {
		path: "fields",
		name: "cFields",
		component: cFields
	}, {
		path: "extra",
		name: "cExtra",
		component: cExtra
	}]
}, {
		path: "/components/data",
		component: cData,
		meta: { title: "Data" },
		children: [{
			path: "",
			name: "cModel",
			component: cModel
		}]
	}
];

export { devRoutes };
