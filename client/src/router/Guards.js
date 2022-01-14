import { appState } from "~/store/appState.js";
import useProfile from "~/store/Profile.js";
// import { restoreSession } from "~/core/restore.js"; // temp
import useAuth from "~/core/auth.js";


const { profile } = useProfile();


const useAuthGuard = async ( to, from, next ) => {
	if ( appState.value.userId ) {
		const { restoreSession } = useAuth();
		await restoreSession();
		next();
	} else next({ "name": "AuthSignIn" });
};

const useOnboardingGuard = ( to, from, next ) => {
	if ( profile.value.new ) next();
	else next({ "name": "Dashboard" });
};

const useAppPagesGuard = ( to, from, next ) => {
	if ( profile.value.new ) next({ "name": "OnboardingForm", "query": { "step": 1 } });
	else next();
};


export { useAuthGuard, useOnboardingGuard, useAppPagesGuard };
