import { useRouter } from "vue-router";
import { appState, setUserIdState } from "~/store/appState";
import useProfile from "~/store/Profile";
import UseData from "~/store/Data.js";


const authServer = async ({ path, data }) => {
	try {
		const API_URI = import.meta.env.VITE_API_URI;
		const apiUrl = `${API_URI}/${path}`;
		const options = {
			"method": "post",
			"mode": "cors",
			"cache": "no-cache",
			"headers": { "Content-Type": "application/json;charset=utf-8" },
			"body": JSON.stringify( data )
		};
		const response = await fetch( apiUrl, options );
		return await response.json();
	} catch ( error ) {
		console.error( error );
		return false;
	}
};


export default function useAuth () {
	const router = useRouter();
	const { profile, setProfile, linkaccount, setLinkAccount, updateProfile } = useProfile();


	const registration = async data => {
		const result = await authServer({ "path": "users", data });
		if ( !result.message ) throw result.error || "Unknown error";
		if ( result.message !== "Signed up." ) throw result.message;
	};

	const onboarding = async form => {
		const userId = appState.value.userId;
		const userType = profile.value.type;
		const result = await authServer({ "path": "onboarding", "data": { "type": userType, "_id": userId, form } });
		if ( !result.ok ) throw result.message;
		updateProfile( form );
		// router.push({ "name": "Dashboard" });
	};

	const authentication = async data => {
		const result = await authServer({ "path": "users/sign_in.json", data: { "user": data } });
		if ( result.error ) throw result.error;
	};

	const verification = async ( email, password, otp_attempt ) => {
		const user = { email, password, otp_attempt };
		const result = await authServer({ "path": "users/sign_in.json", "data": { user } });
		if ( !result.auth_token ) throw "Invalid code";
		localStorage.setItem( "auth_token", result.auth_token );
		router.push({ "name": "Dashboard" });
		/*
		const userProfile = result.data.profile;
		if ( result.data.profile.businessId ) {
			const collection = new UseData( "business" );
			await collection.readDocuments( result.data.profile.businessId );
			setLinkAccount( collection.getDocument().value );
		} else if ( result.data.profile.specialistId ) {
			const collection = new UseData( "specialist" );
			await collection.readDocuments( result.data.profile.specialistId );
			setLinkAccount( collection.getDocument().value );
		}
		setProfile( userProfile );
		setUserIdState( userProfile._id );
		*/
	};

	const newOtp = async email => {
		const result = await authServer({ "path": "new-otp", "data": { email } });
		if ( !result.ok ) throw result.message;
	};

	const reset = async email => {
		const result = await authServer({ "path": "reset", "data": { email } });
		if ( !result.ok ) throw result.message;
	};

	const restoreSession = async () => {
		const authToken = localStorage.getItem("auth_token");
		if (!authToken) window.location.href = "/sign-in";
		const apiUrl = `${import.meta.env.VITE_API_URI}/api/profile`;
		const options = {
			"method": "get",
			"mode": "cors",
			"cache": "no-cache",
			"headers": {
				"Content-Type": "application/json;charset=utf-8",
				"Authorization": `Bearer ${authToken}`
			}
		};
		const response = await fetch( apiUrl, options );
		const result = await response.json();
		if ( !result.id ) {
			// setUserIdState( "" );
			profile.value = {};
			linkaccount.value = {};
			window.location.href = "/";
			return;
		}
		setProfile(result);
		/*
		if ( result.data.businessId ) {
			const collection = new UseData( "business" );
			await collection.readDocuments( result.data.businessId );
			linkaccount.value = collection.getDocument().value;
		} else if ( result.data.specialistId ) {
			const collection = new UseData( "specialist" );
			await collection.readDocuments( result.data.specialistId );
			linkaccount.value = collection.getDocument().value;
		}
		*/
	};

	const signOut = async () => {
		localStorage.removeItem("auth_token");
		setUserIdState( "" );
		await router.push({ "name": "AuthSignIn" });
		profile.value = {};
		linkaccount.value = {};
	};

	const updateAuthenticationInfor = async payload => {
		const userId = appState.value.userId;
		const result = await authServer({ "path": "update-auth-infor", "data": { "_id": userId, ...payload } });
		if ( !result.ok ) throw result.message;
	};

	return {
		restoreSession,
		signOut,
		registration,
		onboarding,
		authentication,
		verification,
		newOtp,
		reset,
		updateAuthenticationInfor
	};
}

