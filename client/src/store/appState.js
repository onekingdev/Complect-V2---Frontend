import { ref } from "vue";

const appState = ref({
	"version": 0,
	"userId": "",
	"collapsedSidebar": false,
	"collapsedSections": {},
	"locale": "en-US"
});

const setAppState = ( key, state ) => {
	appState.value[key] = state;
	localStorage.setItem( "appState", JSON.stringify( appState.value ) );
};

const restoreAppState = () => {
	if ( localStorage.getItem( "appState" ) ) appState.value = JSON.parse( localStorage.getItem( "appState" ) );
};

const setUserIdState = value => setAppState( "userId", value );
const setLocaleState = value => setAppState( "locale", value );
const setAppVersion = value => setAppState( "version", value );
const collapseSidebar = value => setAppState( "collapsedSidebar", value ); // change appState and Local Storage


// expand/collapse navigation sections in sidebar
const collapseSidebarSections = index => {
	const sections = appState.value.collapsedSections;
	try {
		// expand sidebar, if collapsed, and expand navigation section
		if ( appState.value.collapsedSidebar ) {
			sections[index] = false; // expand navigation section (collapse = false)
			collapseSidebar( false ); // expand sidebar, and hold state in LS
		} else sections[index] = !sections[index]; // expand/collapse navigation section
		setAppState( "collapsedSections", appState.value.collapsedSections ); // save sections state to Local Storage
	} catch ( error ) {
		console.error( error );
	}
};


export {
	appState,
	restoreAppState,
	setUserIdState,
	setAppVersion,
	collapseSidebar,
	collapseSidebarSections,
	setLocaleState
};
