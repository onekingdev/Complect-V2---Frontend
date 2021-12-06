import { ref } from "vue";
import { saveForm } from "~/core/utils";


const userProfile = ref( null );
export default function useProfile () {
	const updateProfile = profileUpdate => saveForm( userProfile, profileUpdate );

	return {
		userProfile,
		updateProfile
	};
}
