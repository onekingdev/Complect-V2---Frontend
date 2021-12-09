import { useRouter } from "vue-router";
import { restoreAppState } from "~/store/appState.js";
// import { registerSW } from "virtual:pwa-register";
// const appVersion = 1;

const localStorageTest = () => {
	const ls = window.localStorage;
	if ( !ls ) throw "LocalStorage not detected";
	const x = "localStorageTest";
	ls.setItem( x, x );
	const y = ls.getItem( x );
	if ( x !== y ) throw "LocalStorage not detected";
	ls.removeItem( x );
};

const indexedDBTest = () => {
	if ( !window.indexedDB ) throw "IndexedDB not detected";
};

export default function useInit () {
	const systemChecks = () => {
		try {
			localStorageTest();
			indexedDBTest();
			restoreAppState();
		} catch ( error ) {
			const router = useRouter();
			router.push({
				"name": "ErrorLayer",
				"params": {
					"title": "Unsupported Browser",
					"message": "Please use another browser"
				}
			});
		}
	};

	return { systemChecks };
}
