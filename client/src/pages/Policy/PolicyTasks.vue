<template lang="pug">
card-container(title="Tasks")
	template(#controls v-if="policyDetails.status != 'archived'")
		c-button(title="New Task" @click="showTaskModal()" type="primary")
	template(#content)
		c-table(v-bind="{columns, documents}" searchable v-if="policyDetails.status != 'archived'")
		c-table(v-bind="{columns: archivecolumns, documents}" searchable v-else)
</template>


<script>
import { onMounted, onUnmounted, ref, inject, computed } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cSelect from "~/components/Inputs/cSelect.vue";

export default {
	"components": { cBanner, cSelect },
	"props": {
		"policyDetails": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	setup ( props ) {
		const tasks = new UseData( "tasks" );
		const modal = inject( "modal" );
		const notification = inject( "notification" );
		const showTaskModal = () => modal({ "name": "cModalTask" });

		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => tasks.deleteDocuments( id );
		const policyDetail = computed( () => props.policyDetails );

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
				"cell": "CellAssigned"
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
		const archivecolumns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "RiskDetail" }
			}, {
				"title": "Assignee",
				"key": "assigned",
				"cell": "CellAssigned"
			}, {
				"title": "Start Date",
				"key": "startAt",
				"cell": "CellDate",
				"align": "right"
			}, {
				"title": "Due Date",
				"key": "endAt",
				"cell": "CellDate",
				"align": "right"
			}
		];

		const newTask = ref({
			"name": "",
			"linkto": "",
			"assigned": "",
			"startAt": Date.now(),
			"endAt": Date.now(),
			"description": ""
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
			"documents": tasks.getDocuments(),
			newTask,
			createTask,
			linkOptions,
			AssignOptions,
			showTaskModal,
			policyDetail,
			archivecolumns
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
