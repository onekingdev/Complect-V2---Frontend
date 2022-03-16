<template lang="pug">
card-container(title="Tasks")
	template(#controls)
		c-button(title="New Task" type="default" @click="newTaskModal()")
	template(#content)
		c-table(v-bind="{columns, documents, filters}")
</template>
<script>
import { onMounted, onUnmounted, inject } from "vue";
import UseData from "~/store/Data.js";
export default {
	setup () {
		const tasks = new UseData( "tasks" );
		const modal = inject( "modal" );
		const handleClickEdit = id => modal({ "name": "cModalTask", id });
		const handleClickDelete = id => tasks.deleteDocuments( id );
		const newTaskModal = () => modal({ "name": "cModalTask" });
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTask",
				"unsortable": true
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellAssigned",
				"unsortable": true
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right",
				"unsortable": true
			},
			{
				"title": "Due Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"unsortable": true,
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

		onMounted( () => tasks.readDocuments() );
		onUnmounted( () => tasks.clearStore() );

		return {
			columns,
			"documents": tasks.getDocuments(),
			newTaskModal
		};
	}
};
</script>
<style lang="stylus" scoped>
.container-content
	padding: 1em 5em
</style>
