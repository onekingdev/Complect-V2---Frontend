<template lang="pug">
card-container.c-modal-review(title="Complete Exam" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		section Marking the exam as complete will disable any links to access your requests.
		div You currently have:
		div
			span {{ totalCompletedRequest }}/{{ totalRequest }}
			| Requests Completed
		p Do you want to continue?
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(title="Confirm" type="primary" @click="handleCompleteExam()")
</template>


<script>
import { ref, inject, computed, onMounted } from "vue";
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
			"required": false
		},
		"callBack": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const modalWindow = ref( null );
		const requestDocuments = ref([]);
		const requests = new UseData( "exam_requests" );
		const exams = new UseData( "exams" );
		const { deleteModal } = useModals();
		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );

		const totalCompletedRequest = computed( () => requestDocuments.value.filter( req => req.completed ).length );

		const totalRequest = computed( () => requestDocuments.value.length );

		const handleCompleteExam = async () => {
			const form = { "modifiedAt": new Date(), "completed": true };
			try {
				await exams.updateDocument( props.id, form );
				closeModal();
				notification({
					"type": "success",
					"title": "Success",
					"message": "Exam has been completed."
				});

				if ( props.callBack ) props.callBack.handleSuccess( form );
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Exam has not been completed. Please try again."
				});
			}
		};

		onMounted( async () => {
			await requests.readDocuments( null, { "examId": props.id });
			requestDocuments.value = requests.getDocuments().value;
		});

		return {
			requestDocuments,
			modalWindow,
			totalRequest,
			totalCompletedRequest,
			closeModal,
			handleCompleteExam
		};
	}
};
</script>


<style lang="stylus" scoped>
section
	margin-bottom: 0.7em
span
	color: #28a745;
	margin-right: 0.4em
	font-weight: bold
p
	margin-top: 0.7em
	font-weight: bold
:deep(.card-content)
	gap: 0
</style>
