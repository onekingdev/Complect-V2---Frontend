import { reactive } from "vue";
import { randomId } from "~/core/utils.js";

const modals = reactive([]);

export default function useModals () {
	const createModal = options => {
		modals.unshift({
			"modalId": randomId(),
			"name": options.name,
			"id": options.id
		});
	};

	const deleteModal = id => {
		const index = modals.findIndex( item => item.id === id );
		modals.splice( index, 1 );
	};

	const deleteAllModals = () => modals.splice( 0, modals.length );

	return {
		modals,
		createModal,
		deleteModal,
		deleteAllModals
	};
}
