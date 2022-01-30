<template lang="pug">
card-container(title="Tasks")
	template(#controls)
		c-button-modal(title="New Task" modalTitle="New Task" type="primary")
			template(#content)
				c-field(label="Task Name" v-model="newTask.name" required)
				c-select(label="Link To" :data="linkOptions" v-model="newTask.linkTo")
				c-select(label="Assignee" :data="AssignOptions" v-model="newTask.assigned")
				c-field.col-3(label="Start Date" v-model="newTask.startAt" type="date" required)
				c-field.col-3(label="Due Date" v-model="newTask.endAt" type="date" required)
				c-textarea(label="Description" v-model="newTask.description")
			template(#footer)
				c-button(title="Create" type="primary" @click="createTask()")
	template(#content)
		c-table(v-bind="{columns, documents}" searchable)
</template>


<script>
import { onMounted, onUnmounted, ref, inject } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cSelect from "~/components/Inputs/cSelect.vue";

export default {
	"components": { cBanner, cSelect },
	setup () {
		const tasks = new useData( "tasks" );
		const notification = inject( "notification" );

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => deleteDocuments( id );

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			},
			{
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellText",
			},
			{
				"title": "Start Date",
				"key": "startAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Due Date",
				"key": "endAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		const newTask = ref({
			"name": "",
			"linkto": "",
			"assigned": "",
			"startAt": Date.now(),
			"endAt": Date.now(),
			"description": "",
		});

		const linkOptions = [
			{ "title": "Test", "value": 1 }, { "title": "Test2", "value": 1 }, { "title": "Test3", "value": 2 }
		];

		const AssignOptions = [
			{ "title": "Assgine1", "value": 1 }, { "title": "Assgine2", "value": 1 }, { "title": "Assgine3", "value": 2 }
		];

		const createTask = async () => {
			await tasks.createDocuments([newTask.value]);
			notification({
				"type": "success",
				"title": "New Risk has been Created"
			});
		};


		onMounted( () => tasks.readDocuments() );
		onUnmounted( () => tasks.clearStore() );


		return {
			columns,
			documents: tasks.getDocuments(),
			newTask,
			createTask,
			linkOptions,
			AssignOptions
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
