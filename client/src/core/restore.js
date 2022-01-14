import { appState } from "~/store/appState";
import useProfile from "~/store/Profile";
import { readDocumentsFromCloudDb } from "~/core/api.js";
const { profile } = useProfile();


const restoreSession = async () => {
	const userId = appState.value.userId;
	const user = await readDocumentsFromCloudDb( "specialist", userId );
	profile.value = user.data;
};

export { restoreSession };
