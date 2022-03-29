<template lang="pug">
card-container.c-modal-review(:title="modalTitle" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6
			c-field.col-full(label="Name" v-model="form.name" :errors="errors.name" required)
			c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" :errors="errors.startsAt" required)
			c-field.col-3(label="End Date" type="date" v-model="form.endsAt" :errors="errors.endsAt" required)
	template(#footer)
		c-button(title="Cancel" type="link" @click="closeModal()")
		c-button(:title="btnTitle" type="primary" @click="saveExam()")
</template>


<script>
import { ref, inject, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import UseData from "~/store/Data.js";
import useModals from "~/store/Modals.js";
import { onClickOutside } from "@vueuse/core";
import { validates } from "~/core/utils.js";
import { required, helpers } from "@vuelidate/validators";
import { requireDate } from "~/core/customValidates.js";
import { v4 as uuidv4 } from "uuid";


const endsAtGreaterStartAt = ( endsAt, siblings ) => endsAt >= siblings.startsAt;

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
		const exams = new UseData( "exams" );
		const { profile } = useProfile();
		const { deleteModal } = useModals();
		const modalTitle = ref( "New Exam" );
		const btnTitle = computed( () => props.id ? "Save" : "Create" );
		const form = ref({
			"name": "",
			"startsAt": "",
			"endsAt": "",
			"user_id": profile.value._id,
			"businessId": profile.value.businessId,
			"completed": false,
			"shareId": uuidv4()
		});
		const errors = ref({});

		const router = useRouter();
		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );

		const rules = {
			"name": { required },
			"startsAt": { "required": requireDate },
			"endsAt": { "required": requireDate, "endsAtGreaterStartAt": helpers.withMessage( "Date must not occur before start date", endsAtGreaterStartAt ) }
		};

		const createExam = async () => {
			const data = { ...form.value, "modifiedAt": new Date() };
			try {
				const examIds = await exams.createDocuments([data]);
				closeModal();
				notification({ "type": "success", "title": "Success", "message": "Exam has been created." });

				router.push({
					"name": "ExamDetail",
					"params": { "id": examIds[0] }
				});
			} catch ( err ) {
				notification({ "type": "error", "title": "Error", "message": "Exam has not been created. Please try again." });
			}
		};

		const updateExam = async () => {
			try {
				form.value.modifiedAt = new Date();
				await exams.updateDocument( form.value._id, form.value );
				closeModal();
				notification({
					"type": "success",
					"title": "Success",
					"message": "Exam has been saved."
				});

				if ( props.callBack ) props.callBack.handleSuccess( form.value );
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Exam has not been saved. Please try again."
				});
			}
		};

		const saveExam = async () => {
			errors.value = await validates( rules, form.value );
			if ( Object.keys( errors.value ).length > 0 ) return;

			if ( props.id ) updateExam();
			else createExam();
		};

		onMounted( async () => {
			if ( props.id ) {
				await exams.readDocuments( props.id );
				form.value = exams.getDocument().value;
				modalTitle.value = "Edit Exam";
			}
		});

		return {
			errors,
			modalWindow,
			modalTitle,
			btnTitle,
			form,
			closeModal,
			saveExam
		};
	}
};
</script>
