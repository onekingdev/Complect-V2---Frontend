import { useRouter } from "vue-router";
import { appState, setUserIdState } from "~/store/appState";
import useProfile from "~/store/Profile";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers";
import { createDocumentsInCloudDb, readDocumentsFromCloudDb } from "~/core/api.js";

export default function useAuth () {
	const router = useRouter();
	const { userProfile } = useProfile();


	// temp unsecure _devmode solution !!!
	const signIn = async () => {
		try {
			const randomUserProfile = await randomUsers({ "q": 1 })[0];
			userProfile.value = randomUserProfile;
			createDocumentsInCloudDb( "users", [randomUserProfile]);
			setUserIdState( randomUserProfile._id );
			router.push({ "name": "Dashboard" });
		} catch ( error ) {
			console.error( error );
		}
	};

	// temp unsecure _devmode solution !!!
	// const restoreSession = async () => {
	// 	const userId = appState.value.userId;
	// 	if ( userId ) {
	// 		const profile = await readDocumentsFromCloudDb( "users", userId );
	// 		userProfile.value = profile.data;
	// 	} else router.push({ "name": "AuthSignIn" });
	// };

	const restoreSession = async () => {
		const userId = appState.value.userId;
		if ( userId ) {
			const profile = await readDocumentsFromCloudDb( "users", userId );
			userProfile.value = profile.data;
		}
	};

	// temp unsecure _devmode solution !!!
	const signOut = async () => {
		setUserIdState( "" );
		await router.push({ "name": "AuthSignIn" });
		userProfile.value = {};
	};

	return {
		signIn,
		restoreSession,
		signOut
	};
}

