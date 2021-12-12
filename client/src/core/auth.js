import { useRouter } from "vue-router";
import { appState, setAuthenticationState } from "~/store/appState";
import useProfile from "~/store/Profile";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers";
import { generatedData } from "~/_devmode/generator/generator.js";
import { initLocalDb, getDocumentsFromLocalDb, saveDocumentsToLocalDb } from "~/core/indexedDb";


export default function useAuth () {
	const router = useRouter();
	const { userProfile } = useProfile();

	// fake API
	const syncLocalDB = async () => {
		try {
			const collections = generatedData();
			const collectionsNames = Object.keys( collections );
			for ( const collectionName of collectionsNames )
				await saveDocumentsToLocalDb( collectionName, collections[collectionName]);
		} catch ( error ) {
			console.error( error );
		}
	};


	const signIn = async () => {
		try {
			const randomUserProfile = await randomUsers({ "q": 1 })[0];
			userProfile.value = randomUserProfile;
			await initLocalDb();
			await saveDocumentsToLocalDb( "profile", [
				randomUserProfile
			]);
			await syncLocalDB();
			setAuthenticationState( true );
			router.push({ "name": "Dashboard" });
		} catch ( error ) {
			console.error( error );
		}
	};

	const restoreSession = async () => {
		if ( appState.value.authenticated ) {
			const profile = await getDocumentsFromLocalDb( "profile" );
			userProfile.value = profile[0];
		} else router.push({ "name": "AuthSignIn" });
	};

	const signOut = async () => {
		setAuthenticationState( false );
		await router.push({ "name": "AuthSignIn" });
		userProfile.value = null;
		indexedDB.deleteDatabase( "complect" );
	};

	return {
		signIn,
		restoreSession,
		signOut
	};
}
