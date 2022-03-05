<template lang="pug">
card-container(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-field(label="Title" :errors="errors.title" v-model="form.title" required)
			c-field(label="Employer" :errors="errors.employer" v-model="form.employer" required)
			c-field.col-3(label="Start Date" type="date" :errors="errors.startsAt" v-model="form.startsAt" required)
			c-field.col-3(label="End Date" type="date" :errors="errors.endsAt" v-model="form.endsAt" required)
			div.col-3
			c-checkbox.col-3(label="Present" v-model="form.isPresent")
			c-textarea(label="Description" v-model="form.description")
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="saveUserExperience")
</template>


<script>
import { ref, onMounted, onUnmounted, inject, watch } from "vue";
import useModals from "~/store/Modals.js";
import UseData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
import { onClickOutside } from "@vueuse/core";
import { validates } from "~/core/utils.js";
import { required, helpers } from "@vuelidate/validators";
import { requireDate } from "~/core/customValidates.js";

const requireEndAt = ( endsAt, siblings ) => {
	if ( siblings.isPresent ) return !endsAt;
	return endsAt;
};

const endsAtGreaterStartAt = ( endsAt, siblings ) => {
	if ( endsAt ) return endsAt >= siblings.startsAt;
	return siblings.isPresent;
};

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
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const { profile } = useProfile();
		const { deleteModal } = useModals();
		const userExperiences = new UseData( "user_experiences" );

		const modalTitle = props.id ? "Edit Experience" : "Add Experience";
		const btnTitle = props.id ? "Save" : "Add";
		const action = props.id ? "updated" : "added";
		const modalWindow = ref( null );
		const form = ref({ "isPresent": false, "userId": profile.value._id });
		const errors = ref({});

		const rules = {
			"title": { required },
			"employer": { required },
			"startsAt": { "required": requireDate },
			"endsAt": { "required": requireEndAt, "endsAtGreaterStartAt": helpers.withMessage( "Date must not occur before start date", endsAtGreaterStartAt ) }
		};

		const closeModal = () => deleteModal( props.modalId );

		const saveUserExperience = async () => {
			errors.value = await validates( rules, form.value );
			if ( Object.keys( errors.value ).length > 0 ) return;

			try {
				if ( props.id ) await userExperiences.updateDocument( form.value._id, form.value );
				else await userExperiences.createDocuments([form.value]);

				notification({
					"title": "Success",
					"message": `Experience has been ${action}.`
				});

				closeModal();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Experience has not been ${action}. Please try again.`
				});
			}
		};

		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const getData = async () => {
			await userExperiences.readDocuments( props.id );
			form.value = userExperiences.getDocument().value;
		};

		watch( () => form.value, newValue => {
			if ( newValue.isPresent ) form.value.endsAt = "";
		}, { "deep": true });

		onMounted( () => {
			if ( props.id ) getData();
		});

		onUnmounted( () => form.value = {});

		return { errors, modalWindow, modalTitle, btnTitle, form, closeModal, saveUserExperience };
	}
};
</script>


<style lang="stylus" scoped>
.c-modal-task
	.delete-button
		margin-right: auto
	.completed
		display: flex
		align-items: center
		line-height: 1.3
		.text
			margin-left: 0.5em
			font-weight: 700
			font-size: 0.9em
</style>
