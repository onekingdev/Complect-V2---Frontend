import { ref, watch, onMounted } from "vue";
import { removeSensitiveData } from "~/core/utils";
import _clonedeep from "lodash.clonedeep";


const form = ref({});

export default function useForm ( formName, baseForm = {}) {
	const initForm = () => form.value = baseForm;

	const setForm = () => {
		const cleanForm = _clonedeep( form.value );
		removeSensitiveData( cleanForm, ["password"]);
		sessionStorage.setItem( formName, JSON.stringify( cleanForm ) );
	};

	const restoreForm = () => {
		if ( sessionStorage.getItem( formName ) ) form.value = JSON.parse( sessionStorage.getItem( formName ) );
	};

	const resetForm = () => {
		if ( sessionStorage.getItem( formName ) ) {
			form.value = {};
			sessionStorage.removeItem( formName );
		}
	};


	watch( () => form.value, () => setForm(), { "deep": true });

	onMounted( () => {
		initForm();
		restoreForm();
	});

	// onUnmounted ( () => resetForm())
	return {
		form,
		resetForm
	};
}
