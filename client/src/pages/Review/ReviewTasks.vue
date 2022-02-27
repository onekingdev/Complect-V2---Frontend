<template lang="pug">
.task-container
	card-container(title="Tasks")
		template(#controls)
			c-button(title="New Task" @click="openTaskModal()")
		template(#content)
			c-table(v-bind="{columns, documents}")
</template>

<script>
import { inject, onMounted } from "vue";
import useData from "~/store/Data.js";
export default {
	setup () {
		const { documents, readDocuments, deleteDocuments } = useData( "tasks" );
		const modal = inject( "modal" );

		const openTaskModal = () => modal({ "name": "cModalTask" });
		const handleClickEdit = id => modal({ "name": "cModalTask", id });
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTask"
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellAssigned"
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "End Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"meta": { "overdueWarning": true }
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		onMounted( () => readDocuments() );

		return {
			columns,
			documents,
			openTaskModal
		};
	}
};
</script>

<style lang="stylus" scoped>
.task-container
	width: 82%
	margin: auto
</style>
