import { ref, onMounted, onUnmounted, inject } from "vue";
import { useRoute } from "vue-router";
import UseData from "~/store/Data.js";

const exam = ref({});

export default function useExamDetail () {
	const route = useRoute();
	const notification = inject( "notification" );
	const modal = inject( "modal" );
	const exams = new UseData( "exams" );
	const id = route.params.id;

	const handleSuccessCompleteExam = () => exam.value.completed = true;
	const callBackComplete = { "handleSuccess": handleSuccessCompleteExam };
	const markAsComplete = () => modal({ "name": "cModalCompleteExam", id, "callBack": callBackComplete });

	const markAsInComplete = async () => {
		try {
			await exams.updateDocument( id, { "completed": false });
			notification({
				"type": "success",
				"title": "Success",
				"message": "Exam has been marked as incomplete."
			});
			exam.value.completed = false;
		} catch ( error ) {
			console.error( error );
			notification({
				"type": "error",
				"title": "Error",
				"message": "Exam has not been marked as incomplete. Please try again."
			});
		}
	};

	onMounted( async () => {
		await exams.readDocuments( id );
		exam.value = exams.getDocument().value;
	});

	onUnmounted( () => exams.clearStore() );

	return {
		notification,
		modal,
		id,
		exams,
		exam,
		markAsComplete,
		markAsInComplete
	};
}
