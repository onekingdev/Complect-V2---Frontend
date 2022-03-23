<template lang="pug">
card-container.custom(title="Requests")
	template(#controls)
		c-button(title="View Portal")
	template(#content)
		c-switcher(id="layout" :options="options" v-model="switcherValue" type="primary")
		.requests(v-if="requestFilters.length")
			.requests-item(v-for="(request, index) in requestFilters" :key="index" :class="{'completed': request.completed}")
				.left
					.mark(:class="{ 'checked': request.completed }")
						icon(name="mark" size="huge" @click="toggleMarkRequest(request)")
				.right
					.header
						.name
							span(v-if="request.shared") Shared
							| {{ request.name }}
						.controls
							c-dropdown(label="Label" title="Add Item" wide)
								c-button(title="Text Entry" type="transparent" @click="addTextEntry(request)")
								c-button(title="Upload Files" type="transparent")
								c-button(title="Select Existing" type="transparent")
							c-button(title="New Task" type="primary")
							c-dropdown(iconR="more" wide)
								c-button(title="Edit" type="transparent" @click="editRequest(request)")
								c-button(:title="shareBtnTitle(request)" type="transparent" @click="toggleShareRequest(request)")
								c-button(title="Delete" type="transparent" @click="confirmDeleteRequest(request._id)")
					.details {{ request.details }}
					.counts
						icon(name="chevron-down")
						span {{ request.text_entries ? request.text_entries.length : 0 }} Items
					.text-entries(v-if="request.text_entries")
						.text-entry(v-for="(item, idx) in request.text_entries" :key="idx")
							c-textarea.textarea(v-model.trim="item.content")
							icon(name="close" @click="removeTextEntry(request, idx)")
		.controls
			c-button(title="Add Request" @click="openRequestModal()" iconL="circle_plus")
			.right
				c-button(title="Save" @click="saveExam()")
				c-button(v-if="exam.completed" title="Mark as Incomplete" @click="markAsInComplete()")
				c-button(v-else title="Mark as Complete" type="primary" @click="markAsComplete()")
c-modal(:title="requestModalConfig.title" v-model="isVisibleRequestModal")
	template(#content)
		c-field(label="Requested Item" :errors="requestErrors.name" v-model="requestForm.name" required)
		c-textarea(label="Details" v-model="requestForm.details")
	template(#footer)
		c-button(:title="requestModalConfig.btn" type="primary" @click="saveExamRequest()")
c-modal(title="Delete Note" v-model="isVisibleDeleteNoteModal")
	template(#content)
		p This note will be permanently deleted from this exam request response.
	template(#footer)
		c-button(title="Confirm" type="primary" @click="confirmDeleteReqTextEntry()")
</template>


<script>
import { ref, onMounted, computed } from "vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cModal from "~/components/Misc/cModal.vue";
import { validates } from "~/core/utils.js";
import { required, maxLength } from "@vuelidate/validators";
import useExamDetail from "~/store/Exam.js";

const options = [
	{ "title": "All", "value": "all" }, { "title": "Shared", "value": "shared" }
];

/* eslint-disable */
export default {
	"components": {
		cDropdown,
		cModal,
		cSwitcher
	},
	setup () {
		const {
			notification,
			modal,
			id,
			exam,
			requests,
			requestDocuments,
			markAsComplete,
			markAsInComplete,
			saveExam
		} = useExamDetail();

		const initForm = { "completed": false, "examId": id, "shared": false };
		const isVisibleRequestModal = ref( false );
		const isVisibleDeleteNoteModal = ref(false);
		const switcherValue = ref( "all" );
		const requestForm = ref( null );
		const requestErrors = ref({});
		const pendingReqTextDelete = ref({});

		const requestModalConfig = computed( () => {
			const editConfig = { "btn": "Save", "title": "Edit Request" };
			const addConfig = { "btn": "Add", "title": "New Request" };

			return requestForm.value && requestForm.value._id ? editConfig : addConfig;
		});

		const requestFilters = computed( () => {
			if ( switcherValue.value === "shared" ) return requestDocuments.value.filter( req => req.shared );

			return requestDocuments.value;
		});

		const shareBtnTitle = request => request.shared ? "Unshare" : "Share";

		const openRequestModal = () => {
			isVisibleRequestModal.value = true;
			requestForm.value = { ...initForm };
		};

		const createExamRequest = async () => {
			const data = { ...requestForm.value, "modifiedAt": new Date() };
			try {
				await requests.createDocuments([data]);
				isVisibleRequestModal.value = false;
				notification({ "type": "success", "title": "Success", "message": "Request has been added." });
			} catch ( err ) {
				notification({ "type": "error", "title": "Error", "message": "Request has not been added. Please try again." });
			}
		};

		const updateExamRequest = async ( data, messageSuccess, messageError ) => {
			data.modifiedAt = new Date();
			try {
				await requests.updateDocument( data._id, data );
				const index = requestDocuments.value.find( item => item._id === data._id );
				if ( index > -1 ) requestDocuments.value[index] = data;
				isVisibleRequestModal.value = false;
				notification({
					"type": "success",
					"title": "Success",
					"message": messageSuccess
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": messageError
				});
			}
		};

		const toggleShareRequest = request => {
			request.shared = !request.shared;
			const text = request.shared ? "shared" : "unshared";
			const messageSuccess = `Request has been ${text}`;
			const errorMessage = `Request has not been ${text}`;
			updateExamRequest( request, messageSuccess, errorMessage );
		};

		const saveExamRequest = async () => {
			const rules = { "name": { required, "maxLength": maxLength( 255 ) } };
			requestErrors.value = await validates( rules, requestForm.value );
			if ( Object.keys( requestErrors.value ).length ) return;
			if ( requestForm.value._id ) {
				const messageSuccess = "Request has been saved.";
				const messageError = "Request has not been saved. Please try again.";
				updateExamRequest( requestForm.value, messageSuccess, messageError );
			} else createExamRequest();
		};

		const toggleMarkRequest = request => {
			request.completed = !request.completed;
			const complete = request.completed ? "complete" : "incomplete";
			const messageSuccess = `Request has been marked as ${complete}`;
			const errorMessage = `Request has not been marked as ${complete}`;
			updateExamRequest( request, messageSuccess, errorMessage );
		};

		const editRequest = request => {
			requestForm.value = { ...request };
			isVisibleRequestModal.value = true;
		};

		const handleDeleteRequestSuccess = reqId => {
			const index = requestDocuments.value.findIndex( request => request._id === reqId );
			if ( index > -1 ) requestDocuments.value.splice( index, 1 );
		};

		const confirmDeleteRequest = reqId => {
			modal({
				"name": "cModalDelete",
				"id": reqId,
				"title": "Request",
				"description": "Removing this request will delete any progress and tasks associated with it.",
				"collection": "exam_requests",
				"callback": { "handleSuccess": handleDeleteRequestSuccess }
			});
		};

		const addTextEntry = (req) => {
			if (req.text_entries) req.text_entries.push({"content": ""})
			else req.text_entries = [{"content": ""}]
		}

		const removeTextEntry = (req, idx) => {
			pendingReqTextDelete.value = { req, idx }
			isVisibleDeleteNoteModal.value = true
		}

		const confirmDeleteReqTextEntry = async () => {
			const req = pendingReqTextDelete.value.req
			req.text_entries.splice(pendingReqTextDelete.value.idx, 1)
			try {
				await requests.updateDocument( req._id, req )
				isVisibleDeleteNoteModal.value = false
				notification({
					"type": "success",
					"title": "Success",
					"message": "Note has been deleted."
				});
			} catch (err) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Note has not been deleted. Please try again."
				});
			}
		}

		onMounted( async () => {
			await requests.readDocuments( null, { "examId": id });
			requestDocuments.value = requests.getDocuments().value;
		});

		return {
			exam,
			requestModalConfig,
			requestErrors,
			requestFilters,
			requestForm,
			isVisibleDeleteNoteModal,
			isVisibleRequestModal,
			options,
			switcherValue,
			shareBtnTitle,
			toggleShareRequest,
			openRequestModal,
			saveExamRequest,
			toggleMarkRequest,
			editRequest,
			confirmDeleteRequest,
			markAsComplete,
			markAsInComplete,
			addTextEntry,
			removeTextEntry,
			confirmDeleteReqTextEntry,
			saveExam
		};
	}
};
</script>


<style lang="stylus" scoped>
.custom
	height: auto
.requests
	&-item
		padding: 1em
		margin: 1em 0
		display: flex
		border: 1px solid var(--c-border)
		border-radius: 0.2em
		&.completed
			background-color: var(--c-bg-light-hover);
		.left
			.mark
				margin-top: 0.4em
				border: 1px solid #ccc
				border-radius: 0.2em
				width: 2em
				height: 1.4em
				svg
					position: relative
					left: 0.3em
					cursor: pointer
				&.checked
					border-color: var(--c-success)
					background: var(--c-success)
					svg
						fill: white
		.right
			width: 100%
			margin-left: 2em
			.header
				display: flex
				justify-content: space-between
				.name
					flex-basis: 70%
					font-size: 1.3em
					font-weight: bold
					span
						position: relative
						top: -0.2em
						border-radius: 0.3em
						margin-right: 1em
						padding: 0.5em 1em
						font-size: 0.6em
						background: #d5fbef;
						color: #1bb380;
			.details
				margin-top: 1em
			.counts
				padding-bottom: 1.2em
				margin: 1em 0
				border-bottom: 1px solid rgba(0, 0, 0, 0.1)
				span
					margin-left: 0.5em
					font-size: 0.9em

.text-entry
	margin: 1em 0
	display: flex
	.textarea
		padding-right: 1.5em
	svg
		width: 0.8em
		cursor: pointer
		margin-top: 1.5em
.controls
	display: flex
	justify-content: space-between
	gap: 1em
	align-self: flex-start
	.right
		display: flex
		gap: 1em
</style>
