import { ref } from "vue";

const profile = ref( null );
const linkaccount = ref( null );

export default function useProfile () {
	const saveForm = ( original, update ) => {
		Object.keys( update ).forEach( key => original.value[key] = update[key]);
	};

	const setProfile = data => profile.value = data;
	const updateProfile = profileUpdate => saveForm( profile, profileUpdate );
	const setLinkAccount = data => linkaccount.value = data;

	return {
		profile,
		linkaccount,
		setProfile,
		updateProfile,
		setLinkAccount,
		saveForm
	};
}

