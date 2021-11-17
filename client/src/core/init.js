import { useRouter } from "vue-router";
import { registerSW } from "virtual:pwa-register";
import { initLocalDb } from "~/core/indexedDb.js";
import { appState, restoreAppState, setInstallationState } from "~/store/appState.js";


// socket.onmessage = function (event) {
//     console.log('Message from server ', event.data);
// };


const localStorageTest = () => {
	console.info( "Local Storage Check" );
	const ls = window.localStorage;
	if ( !ls ) throw "LocalStorage not detected";
	const x = "localStorageTest";
	localStorage.setItem( x, x );
	const y = ls.getItem( x );
	if ( x !== y ) throw "LocalStorage not detected";
	ls.removeItem( x );
};

const indexedDBTest = () => {
	console.info( "IndexedDB Check" );
	if ( !window.indexedDB ) throw "IndexedDB not detected";
};


export default function useInit () {
	const systemChecks = () => {
		try {
			console.group( "System Checks" );
			restoreAppState();
			localStorageTest();
			indexedDBTest();
		} catch ( error ) {
			const router = useRouter();
			router.push({
				"name": "ErrorLayer",
				"params": {
					"title": "Unsupported Browser",
					"message": "Please use another browser"
				}
			});
		} finally {
			console.groupEnd();
		}
	};

	const installApp = async () => {
		try {
			if ( !appState.value.installed ) {
				console.group( "Installation" );
				await initLocalDb();
				await registerSW();
				setInstallationState();
			}
			// await syncLocalDb()
		} catch ( error ) {
			console.error( error );
		} finally {
			console.groupEnd();
		}
	};


	return {
		systemChecks,
		installApp
	};
}
