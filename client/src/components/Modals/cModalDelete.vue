<template lang="pug">
card-container(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			.col-1
				icon(name="error" size="huge")
			.col-5
				div.description {{ description }}
				div.description.confirm Do you want to continue?
	template(#footer)
		c-button(title="Cancel" @click="closeModal()")
		c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>


<script>
import { ref, inject } from "vue";
import useProfile from "~/store/Profile.js";
import useData from "~/store/Data.js";
import useModals from "~/store/Modals.js";
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
			"required": true
		},
		"collection": {
			"type": String,
			"default": "",
			"required": true
		},
		"title": {
			"type": String,
			"default": "",
			"required": true
		},
		"description": {
			"type": String,
			"default": "",
			"required": false
		},
		"ownerId": {
			"type": String,
			"default": "",
			"required": false
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const modalWindow = ref( null );
		const { deleteDocuments } = useData( props.collection );
		const { profile } = useProfile();
		const { deleteModal } = useModals();
		const closeModal = () => deleteModal( props.modalId );

		const modalTitle = `Delete ${props.title}`;
		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const handleClickDelete = () => {
			if ( props.ownerId ) {
				if ( props.ownerId === profile.value._id ) {
					deleteItem();
				} else {
					notification({
						"type": "error",
						"title": "Error",
						"message": "Only the owner of a document or folder may permanently delete it."
					});
				}
			} else {
				deleteItem();
			};
		};

		const deleteItem = async () => {
			try {
				await deleteDocuments( props.id );
				notification({
					"type": "success",
					"title": "Success",
					"message": `${props.title} has been deleted.`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `${props.title} has not been deleted. Please try again.`
				});
			} finally {
				closeModal();
			}
		};

		return { modalTitle, modalWindow, closeModal, handleClickDelete };
	}
};
</script>


<style lang="stylus" scoped>
.description
	font-size: 0.8em
.confirm
	font-weight: bold
</style>
