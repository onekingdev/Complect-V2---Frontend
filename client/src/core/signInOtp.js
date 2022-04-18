import { ref, computed } from "vue";
import useAuth from "~/core/auth";

export default function useSignInOtp () {
	const { verification } = useAuth();
	const inputs = ref([]);
	const numbers = ref([]);
	const otp = computed( () => numbers.value.join( "" ) );
	const errorMessage = ref( "" );

	const submitCode = async ( email, password, value ) => {
		errorMessage.value = "";
		if ( otp.value.length < 6 ) errorMessage.value = "Incomplete code";
		else {
			try {
				await verification( email, password, value );
			} catch ( error ) {
				errorMessage.value = "Incorrect code";
			}
		}
	};

	const keyupHandler = ( e, index ) => {
		if ( e.keyCode === 8 && e.target.value === "" && inputs.value[index - 2] ) inputs.value[index - 2].focus();
	};

	const inputHandler = ( e, index ) => {
		const [first] = e.target.value;
		e.target.value = first ?? "";
		if ( otp.value.length >= 6 ) inputs.value[index - 1].blur();
		if ( index !== inputs.value.length && first !== undefined ) inputs.value[index].focus();
	};

	return {
		inputs,
		numbers,
		otp,
		errorMessage,
		submitCode,
		keyupHandler,
		inputHandler
	};
}
