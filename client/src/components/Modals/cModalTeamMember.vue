<template lang="pug">
card-container(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			template(v-if="isDisableModal")
				div.col-1
					icon.warning(name="warning" size="huge")
				div.col-5
					p.heading Disabling the user will remove any permissions and access granted to them. Please select a reason for disabling the user.
					p.heading.bold Do you want to continue?
				c-select.col-full(label="Reason" :data="disabledReasons" v-model="form.disabledReason" placeholder="Termination" required)
				c-textarea(label="Additional Information" v-model="form.disabledReasonInfor" placeholder="Additional Information")
			template(v-else)
				c-field.col-3(label="First Name" v-model="form.firstName" placeholder="First Name" required)
				c-field.col-3(label="Last Name" type="text" placeholder="Last Name" v-model="form.lastName" required)
				c-field(label="Email" type="email" placeholder="Email" v-model="form.email" :errors="errors.email" required)
				c-select(label="Role" :data="userRoles" v-model="form.role" required)
				c-field(label="Start Date" type="date" v-model="form.startDate" required)
				c-checkbox(label="Access Person" v-model="form.accessPerson")
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="save")
</template>


<script>
import { ref, onMounted, onUnmounted, inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import teamMember from "~/core/teamMember.js";
import { onClickOutside } from "@vueuse/core";

const userRoles = [
	{
		"title": "Basic",
		"value": "basic"
	}, {
		"title": "Trusted",
		"value": "trusted"
	}, {
		"title": "Admin",
		"value": "admin"
	}
];

const disabledReasons = [
	{
		"title": "Termination",
		"value": "termination"
	}, {
		"title": "Resignation",
		"value": "resignation"
	}, {
		"title": "Temporary",
		"value": "temporary"
	}, {
		"title": "Other",
		"value": "other"
	}
];

const notificationMessage = ( isDisableModal, disabled, id ) => {
	const messages = {};
	if ( isDisableModal ) {
		messages.success = disabled ? "Reason has been updated." : "User has been disabled.";
		messages.error = disabled ? "Reason has not been updated" : "User has not been disabled";
	} else {
		messages.success = id ? "User has been updated." : "User has been created.";
		messages.error = id ? "User has not been updated" : "User has not been created";
	}

	return messages;
};

const modalSetup = ( isDisableModal, id ) => {
	const disabledModalTitle = id ? "Edit Reason" : "Disable User";
	const userModalTitle = id ? "Edit User" : "Add User";
	const disabledModalBtn = id ? "Save" : "Confirm";
	const userModalBtn = id ? "Save" : "Create";
	const modalTitle = isDisableModal ? disabledModalTitle : userModalTitle;
	const btnTitle = isDisableModal ? disabledModalBtn : userModalBtn;

	return { modalTitle, btnTitle };
};

export default {
	"components": { cSelect },
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
		"modalType": {
			"type": String,
			"default": "",
			"required": false
		},
		"callBack": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	},
	setup ( props ) {
		const modal = inject( "modal" );
		const notification = inject( "notification" );
		const { deleteModal } = useModals();
		const { document, readDocuments, updateDocument } = useData( "team_members" );
		const isDisableModal = props.modalType === "disabled";
		const { modalTitle, btnTitle } = modalSetup( isDisableModal, props.id );
		const errors = ref({});

		const modalWindow = ref( null );
		const form = ref({
			"accessPerson": false,
			"disabled": false
		});

		const { createUser, toggleDisable } = teamMember();

		const closeModal = () => deleteModal( props.modalId );

		const disableAction = async () => {
			if ( form.value.disabled ) await updateDocument( form.value._id, form.value );
			else await toggleDisable( form.value );
		};

		const userAction = async () => {
			if ( props.id ) await updateDocument( form.value._id, form.value );
			else await createUser( form.value );
		};

		const save = async () => {
			const messages = notificationMessage( isDisableModal, form.value.disabled, props.id );
			try {
				if ( isDisableModal ) await disableAction();
				else await userAction();

				notification({
					"title": "Success",
					"message": messages.success
				});

				if ( props.callBack ) props.callBack.handleSuccess( form.value );

				closeModal();
			} catch ( error ) {
				errors.value.email = [error];
				notification({
					"type": "error",
					"title": "Error",
					"message": `${messages.error}. Please try again.`
				});
			}
		};

		onClickOutside( modalWindow, () => {
			closeModal();
		});

		const getData = async () => {
			await readDocuments( props.id );
			form.value = document.value;
		};

		onMounted( () => {
			if ( props.id ) getData();
		});

		onUnmounted( () => form.value = {});

		return {
			errors,
			isDisableModal,
			disabledReasons,
			userRoles,
			modalWindow,
			modalTitle,
			btnTitle,
			form,
			closeModal,
			save
		};
	}
};
</script>


<style lang="stylus" scoped>
.heading
	font-size: 0.85em;
	&.bold
		font-weight: bold;
.warning
	position: relative;
	top: 1em;
	left: 1em;
</style>
