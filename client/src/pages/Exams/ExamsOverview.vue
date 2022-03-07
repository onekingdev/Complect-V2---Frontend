<template lang="pug">
c-table(v-bind="{columns, documents}")
</template>


<script>
import { onMounted, onUnmounted, inject, ref } from "vue";
import UseData from "~/store/Data.js";
import cModalDelete from "~/components/Modals/cModalDelete.vue";

export default {
	"components": { cModalDelete },
	setup () {
		const modal = inject( "modal" );
		const exams = new UseData( "exams" );

		const documents = ref([]);

		const handleSuccess = updatedExam => {
			const index = documents.value.findIndex( item => item._id === updatedExam._id );

			documents.value[index] = { ...updatedExam, "status": "progress" };
		};

		const callBack = { handleSuccess };

		const handleClickEdit = id => modal({ "name": "cModalExam", id, callBack });
		const handleDeleteExam = id => {
			modal({
				"name": "cModalDelete",
				id,
				"title": "Exam",
				"description": "Removing this exam will delete any progress and tasks associated with the file.",
				"collection": "exams"
			});
		};

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "ExamDetail" }
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			},
			{
				"title": "Date Created",
				"key": "createdAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Last Modified",
				"key": "modifiedAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Delete", "action": handleDeleteExam }
					]
				}
			}
		];


		onMounted( async () => {
			await exams.readDocuments();
			documents.value = exams.getDocuments().value.map( item => ({ ...item, "status": "progress" }) );
		});
		onUnmounted( () => exams.clearStore() );

		return {
			columns,
			documents
		};
	}
};
</script>
