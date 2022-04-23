import { appState } from "~/store/appState.js";
import useProfile from "~/store/Profile.js";
import useBusiness from "~/store/Business";
// import { restoreSession } from "~/core/restore.js"; // temp
import useAuth from "~/core/auth.js";


const { profile } = useProfile();
const { business } = useBusiness();

const isOnboarded = () => {
	if ( business && business.value?.owner ) return business.value?.onboarding_passed;
	else return profile.value?.onboarding_passed;
};

const useAuthGuard = async ( to, from, next ) => {
	try {
		const { restoreSession } = useAuth();
		await restoreSession();
		next();
	} catch (error) {
		next({ "name": "AuthSignIn" });
	}
};

const useOnboardingGuard = ( to, from, next ) => {
	if ( !isOnboarded() ) next();
	else next({ "name": "Dashboard" });
};

const useNotOnboardedGuard = ( to, from, next ) => {
	if ( !isOnboarded() ) next ({ "name": "OnboardingForm", "query": { "step": 1 } });
	else next();
};

const businessPagesGuard = ( to, from, next ) => {
	if ( profile.value.type === "business" ) next();
	else next({ "name": "ErrorLayer" });
};

export { useAuthGuard, useOnboardingGuard, useNotOnboardedGuard, businessPagesGuard };
