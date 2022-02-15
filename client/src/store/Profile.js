import { ref } from "vue";


const profile = ref( null );

export default function useProfile () {
	const saveForm = ( original, update ) => {
		Object.keys( update ).forEach( key => original[key] = update[key]);
	};

	const setProfile = data => profile.value = data;
	const updateProfile = profileUpdate => saveForm( profile, profileUpdate );

	return {
		profile,
		setProfile,
		updateProfile
	};
}
