<template lang="pug">
page-container(section="Regulatory Exams" :title="exam.name" type="document")
	template(#controls)
		c-button(title="Share Link" type="link" @click="openShareLinkModal()")
		c-button(v-if="exam.completed" title="Mark as InComplete" @click="markAsInComplete()")
		c-button(v-else title="Mark as Complete" @click="markAsComplete()")
		c-button(title="Save and Exit" type="primary" @click="saveExam(true)")
		icon.exit(name="close" @click="exitExamDetail()")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
	template(#navigation-controls)
		c-dropdown(title="Actions")
			c-button(title="Edit" type="transparent" @click="editExam()")
			c-button(title="Delete" type="transparent" @click="handleDeleteExam()")
	template(#content)
		router-view
c-modal(title="Share Exam" v-model="isVisibleInviteEmail")
	template(#content)
		.grid-6
			c-field.col-5(label="Email" type="text" placeholder="Email" :errors="errors.email" v-model.trim="shareEmail" v-on:keyup.enter="handleAddInviteEmail()" required)
			c-button.col-1.send-btn(title="Send" type="primary" @click="handleAddInviteEmail()")
		div.sharedEmails(v-if="exam.sharedEmails && exam.sharedEmails.length")
			h4 Invited
			.email-item(v-for="(email, index) in exam.sharedEmails" :key="index")
				span {{ email }}
				icon(name="close" @click="revokeEmail(index)")
c-modal(title="Revoke Access" v-model="isVisibleRevokeAccess" @update:modelValue="handleCloseRevokeModal")
	template(#content)
		.grid-6.confirm-revoke
			.col-1
				icon(name="error" size="big")
			.col-5
				div.description This will revoke the email address owner's access to your auditor portal.
				div.description.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleConfirmRevoke()")
</template>


<script>
import { ref, computed } from "vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import cModal from "~/components/Misc/cModal.vue";
import { validates } from "~/core/utils.js";
import { required, email } from "@vuelidate/validators";
import useExam from "~/core/exams.js";
import useExamDetail from "~/store/Exam.js";

const tabs = [
	{
		"title": "Details",
		"routeName": "ExamDetail"
	}, {
		"title": "Tasks",
		"routeName": "ExamDetailTasks"
	}, {
		"title": "Documents",
		"routeName": "ExamDetailDocuments"
	}
];

/* eslint-disable */
export default {
	"components": {
		cModal,
		cDropdown,
		cCheckbox
	},
	setup () {
		const {
			notification,
			modal,
			id,
			exams,
			exam,
			markAsComplete,
			markAsInComplete,
			saveExam,
			exitExamDetail
		} = useExamDetail();

		const isVisibleInviteEmail = ref( false );
		const isVisibleRevokeAccess = ref( false );
		const indexRevokeEmail = ref( -1 );
		const errors = ref({});
		const shareEmail = ref( "" );

		const shareExamModalTitle = computed( () => isVisibleRevokeAccess.value ? "Revoke Access" : "Share Exam" );

		const handleSuccess = updatedExam => {
			exam.value = updatedExam;
		};

		const callBack = { handleSuccess };

		const editExam = () => modal({ "name": "cModalExam", id, callBack });

		const handleDeleteExam = () => {
			modal({
				"name": "cModalDelete",
				id,
				"title": "Exam",
				"description": "Removing this exam will delete any progress and tasks associated with the file.",
				"collection": "exams",
				"callback": exitExamDetail
			});
		};

		const handleCloseRevokeModal = () => {
			isVisibleInviteEmail.value = true;
		};

		const revokeEmail = index => {
			isVisibleRevokeAccess.value = true;
			isVisibleInviteEmail.value = false;
			indexRevokeEmail.value = index;
		};

		const resetAfterRevoke = () => {
			indexRevokeEmail.value = -1;
			isVisibleRevokeAccess.value = false;
			isVisibleInviteEmail.value = true;
		};

		const handleConfirmRevoke = async () => {
			if ( indexRevokeEmail.value < 0 ) return;

			try {
				exam.value.sharedEmails.splice( indexRevokeEmail.value, 1 );
				await exams.updateDocument( id, { "sharedEmails": exam.value.sharedEmails });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Access has been revoked."
				});
				resetAfterRevoke();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Access has not been revoked. Please try again."
				});
			}
		};

		const openShareLinkModal = () => {
			errors.value = {};
			shareEmail.value = "";
			resetAfterRevoke()
		};

		const handleAddInviteEmail = async () => {
			const newInviteEmail = shareEmail.value;
			const rules = { "email": { required, email } };
			errors.value = await validates( rules, { "email": newInviteEmail });
			if ( exam.value.sharedEmails && exam.value.sharedEmails.includes( newInviteEmail ) ) errors.value.email = ["Email already invited"];
			if ( Object.keys( errors.value ).length ) return;

			const { addInviteEmail } = useExam();

			try {
				await addInviteEmail({ id, "email": newInviteEmail });
				if ( exam.value.sharedEmails ) exam.value.sharedEmails.push( newInviteEmail );
				else exam.value.sharedEmails = [newInviteEmail];
				shareEmail.value = "";
				notification({
					"type": "success",
					"title": "Success",
					"message": "Invitation has been sent."
				});
			} catch ( err ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Invitation has not been sent. Please try again."
				});
			}
		};

		return {
			isVisibleRevokeAccess,
			isVisibleInviteEmail,
			shareEmail,
			errors,
			exam,
			tabs,
			shareExamModalTitle,
			openShareLinkModal,
			handleAddInviteEmail,
			revokeEmail,
			handleCloseRevokeModal,
			handleConfirmRevoke,
			editExam,
			handleDeleteExam,
			markAsComplete,
			markAsInComplete,
			exitExamDetail,
			saveExam
		};
	}
};
</script>


<style lang="stylus" scoped>
.exit
	margin-top: 0.5em
	cursor: pointer
.description
	font-size: 0.8em
.confirm
	font-weight: bold
.send-btn
	align-self: flex-start
	position: relative
	top: 1.4em
.sharedEmails
	h4
		border-bottom: 1px solid #ccc
		padding-bottom: 0.5em
		padding-left: 1em
		color: #797B7E
		font-size: 0.9em
	.email-item
		display: flex
		justify-content: space-between
		width: 100%
		padding: 0.7em 0
		border-bottom: 1px solid #ccc
		span
			padding-left: 1em
			font-size: 0.9em
		svg
			cursor: pointer
			margin-right: 0.3em
			width: 0.8em
			margin-top: 0.1em
</style>
