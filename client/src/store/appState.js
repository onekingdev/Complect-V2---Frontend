import { ref } from "vue";

const appState = ref({
	"installed": false,
	"collapsedSidebar": false,
	"collapsedSections": {},
	"locale": "en-US"
});

const setAppState = ( key, state ) => {
	appState.value[key] = state;
	localStorage.setItem( "appState", JSON.stringify( appState.value ) );
};

const restoreAppState = () => {
	// console.info( "Restore App State" );
	if ( localStorage.getItem( "appState" ) ) appState.value = JSON.parse( localStorage.getItem( "appState" ) );
};


const setInstallationState = () => setAppState( "installed", true );

const switchLocale = locale => setAppState( "locale", locale );

// expand/collapse sidebar
const collapseSidebar = value => setAppState( "collapsedSidebar", value ); // change appState and Local Storage


// expand/collapse navigation sections in sidebar
const collapseSidebarSections = ( index ) => {
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
	setInstallationState,
	collapseSidebar,
	collapseSidebarSections,
	switchLocale
};
