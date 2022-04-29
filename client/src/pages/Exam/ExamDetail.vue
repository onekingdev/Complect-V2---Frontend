<template lang="pug">
card-container.custom(title="Requests")
	template(#controls)
		c-button(title="View Portal" @click="redirectToPortal()")
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
								c-button(title="Upload Files" type="transparent" @click="uploadFileReq(request)")
								c-button(title="Select Existing" type="transparent" @click="selectExisting(request)")
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
					.files.grid-6(v-if="request.files")
						file-item.col-3(v-for="(file, fileIdx) in request.files" :key="fileIdx" :file="file")
		.controls
			c-button(title="Add Request" @click="openRequestModal()" iconL="circle_plus")
			.right
				c-button(title="Save" @click="saveExam()")
				c-button(v-if="exam.completed" title="Mark as Incomplete" @click="markAsInComplete()")
				c-button(v-else title="Mark as Complete" type="primary" @click="markAsComplete()")
input(v-show="false" type="file" @change="onChange()" ref="fileInput")
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
import FileItem from "~/components/Helpers/FileItem.vue";
import { validates, validateFileSize } from "~/core/utils.js";
import { required, maxLength } from "@vuelidate/validators";
import useExamDetail from "~/store/Exam.js";
import { manualApi } from "~/core/api.js";

const options = [
	{ "title": "All", "value": "all" }, { "title": "Shared", "value": "shared" }
];

const MAX_FILE_SIZE = 10; // mB

/* eslint-disable */
export default {
	"components": {
		cDropdown,
		cModal,
		cSwitcher,
		FileItem
	},
	setup () {
		const {
			router,
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
		
		const fileInput = ref( null );
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
				"callback": handleDeleteRequestSuccess
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

		const redirectToPortal = () => {
			router.push({
				"name": "ExamPortal",
				"params": { "id": id }
			});
		}

		const uploadingReq = ref(null);
		const uploadFileReq = (req) => {
			uploadingReq.value = req
			fileInput.value.click()
		}

		const onChange = async () => {
			// loading.value = true;
			try {
				const file = fileInput.value.files[0];
				const formData = new FormData();
				if (!validateFileSize(file.size, MAX_FILE_SIZE)) {
					notification({ "type": "error", "title": "Error", "message": "Document has not been uploaded. File size must be less than 10MB." });
					return false
				}

				formData.append( "file", file );
				formData.append( "collection", "documents" );
				// formData.append( "folderId", folderId );
				const uploadRes = await manualApi({ "method": "POST", "url": "upload", "data": formData });
				const newFile = {
					"name": file.name,
					"size": file.size,
					"createdAt": Date.now(),
					"link": uploadRes.Location,
					"key": uploadRes.Key
				}
				// console.log(uploadRes)

				if (uploadingReq.value.files) {
					uploadingReq.value.files.push(newFile)
				} else uploadingReq.value.files = [newFile]
				await requests.updateDocument( uploadingReq.value._id, { ...uploadingReq.value });
				notification({ "type": "success", "title": "Success", "message": "File has been uploaded." });
			} catch ( error ) {
				console.error( error );
				notification({ "type": "error", "title": "Error", "message": "Folder has not been uploaded. Please try again." });
			}
		};

		const selectExisting = (requestId) => {
			modal({
				"name": "cModalExamSelectExisting"
			});
		}

		onMounted( async () => {
			await requests.readDocuments( null, { "examId": id });
			requestDocuments.value = requests.getDocuments().value;
		});

		return {
			fileInput,
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
			redirectToPortal,
			saveExam,
			uploadFileReq,
			onChange,
			selectExisting
		};
	}
};
</script>


<style lang="stylus" scoped>
.custom
	height: auto

.controls
	display: flex
	justify-content: space-between
	gap: 1em
	align-self: flex-start
	.right
		display: flex
		gap: 1em
</style>
