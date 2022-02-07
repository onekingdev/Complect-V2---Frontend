<template lang="pug">
card-container.c-modal-task(title="Delete Internal Review" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-12
			img.minuse(src="/img/error_20.5080af0b.svg")
			.text
				p Removing this internal review will delete any progress, tasks, and documents associated with the review.
				b Do you want to continue?

	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(title="Confirm" type="primary" @click="deleteReview()")
</template>


<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import { onClickOutside } from "@vueuse/core";

export default {
	"props": {
		"modalId": {
			"type": String,
			"required": true
		},
		"id": {
			"type": String,
			"default": "",
			"required": false
		},
		"content": {
			"type": String,
			"default": "",
			"required": false
		}
	},
	setup ( props ) {
		const { deleteDocuments } = useData( "reviews" );
		const { deleteModal } = useModals();
		const router = useRouter();
		const notification = inject( "notification" );
		const modalWindow = ref( null );

		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );

		const deleteReview = async () => {
			try {
				await deleteDocuments( props.id );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been deleted."
				});
				router.push({ "name": "ReviewsOverview" });
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been deleted. Please try again."
				});
			} finally {
				closeModal();
			}
		};

		return { modalWindow, closeModal, deleteReview };
	}
};
</script>


<style lang="stylus" scoped>
	.grid-12
		display: grid
		font-size: 0.875em
		grid-template-columns: repeat(12, 1fr)
		.minuse
			grid-column: span 1
			width: 1.5em
		.text
			grid-column: span 11

</style>
