import { ref } from "vue";


const userProfile = ref( null );
export default function useProfile () {
	const saveForm = ( original, update ) => {
		Object.keys( update ).forEach( key => original[key] = update[key]);
	};
	const updateProfile = profileUpdate => saveForm( userProfile, profileUpdate );

	return {
		userProfile,
		updateProfile
	};
}
