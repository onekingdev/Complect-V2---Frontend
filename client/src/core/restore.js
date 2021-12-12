import { appState } from "~/store/appState";
import useProfile from "~/store/Profile";
import { readDocumentsFromCloudDb } from "~/core/api.js";
const { userProfile } = useProfile();


const restoreSession = async () => {
	const userId = appState.value.userId;
	const profile = await readDocumentsFromCloudDb( "users", userId );
	userProfile.value = profile.data;
};

export { restoreSession };
