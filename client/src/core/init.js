import { useRouter } from "vue-router";
import { restoreAppState } from "~/store/appState.js";
import { registerSW } from "virtual:pwa-register";

const localStorageTest = () => {
	const ls = window.localStorage;
	if ( !ls ) throw new Error( "LocalStorage not detected" );
	const x = "localStorageTest";
	ls.setItem( x, x );
	const y = ls.getItem( x );
	if ( x !== y ) throw new Error( "LocalStorage not detected" );
	ls.removeItem( x );
};

export default function useInit () {
	const systemChecks = async () => {
		try {
			localStorageTest();
			await restoreAppState();
			await registerSW();
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
