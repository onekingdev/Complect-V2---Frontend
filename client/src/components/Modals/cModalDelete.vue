<template lang="pug">
card-container(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.content
			div
				icon(name="error" size="big")
			.description
				p {{ description }}
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>


<script>
import { ref, inject } from "vue";
import useProfile from "~/store/Profile.js";
import UseData from "~/store/Data.js";
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
		"callback": {
			"type": Function,
			"default": () => 1,
			"required": false
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
		const collection = new UseData( props.collection );
		const { profile } = useProfile();
		const { deleteModal } = useModals();
		const closeModal = () => deleteModal( props.modalId );

		const modalTitle = `Delete ${props.title}`;
		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const deleteItem = async () => {
			try {
				await collection.deleteDocuments( props.id );
				if ( props.callback ) props.callback( props.id );
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

		const handleClickDelete = () => {
			if ( props.ownerId ) {
				if ( props.ownerId === profile.value._id ) deleteItem();
				else {
					notification({
						"type": "error",
						"title": "Error",
						"message": "Only the owner of a document or folder may permanently delete it."
					});
				}
			} else deleteItem();
		};

		return { modalTitle, modalWindow, closeModal, handleClickDelete };
	}
};
</script>


<style lang="stylus" scoped>
.card-container
	:deep(.card-content)
		padding: 1.25em
.content
	display: flex
	gap: 1.25em
.description
	font-size: 0.875em
	.confirm
		padding-top: 0.625em
		font-weight: bold
</style>
