<template lang="pug">
c-card(title="Table" type="flex-column")
	template(#header-controls)
		c-select(:data="columnsSet" v-model="visibleColumns" searchable multiple)
		c-button(iconL="refresh" @click="generateDocuments()" type="transparent")
	template(#content)
		c-table(v-bind="{columns, documents, filters}" searchable)
</template>


<script>
import { ref, computed, onMounted } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import { randomMongoId, randomBool, randomNumber, randomElement } from "~/_devmode/generator/components/atoms/utils.js";
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js";


export default {
	components: { cSelect },
	setup() {
		const documents = ref([])
		const columnsSet = [
			{ title: "Title", value: "title" },
			{ title: "Collaborators", value: "collaborators" },
			{ title: "Tasks", value: "tasks" },
			{ title: "Cost", value: "fixedBudget" },
			{ title: "Status", value: "status" },
			{ title: "Start Date", value: "startsAt" },
			{ title: "End Date", value: "endsAt" },
			{ title: "Dropdown", value: "dropdown" },
		]
		const visibleColumns = ref(["title", "status", "fixedBudget", "startsAt", "dropdown"])

		
		const handleClickEdit = id => console.debug( "Edit", id );
		const handleClickDuplicate = id => console.debug( "Duplicate", id );
		const handleClickDelete = id => console.debug( "Delete", id );


		const generateDocuments = () => {
			documents.value = []
			for ( let i = 1; i < randomNumber(10,20); i++ ) {
				let startDate = randomDatesInRange({q: 1, shift: [-50, 0]})[0]
				documents.value.push({
					"completed":  randomBool(),
					"_id": randomMongoId(),
					"title": randomTitles({w: [1, 10]})[0],
					"linked": randomTitles({w: [1, 10]})[0],
					"progres": 1,
					"assignee": [],
					"collaborators": randomUsers({q:[0,7]}),
					"tasks": [],
					"fixedBudget": Math.round( randomNumber( 100, 20000 ) / 100 ) * 100,
					"created": startDate + randomNumber(-1e5,-1e3),
					"modified": startDate + randomNumber(-1e2,0),
					"status": randomElement(["draft", "inprogress", "complete"]),
					"startsAt": startDate,
					"endsAt": startDate + randomNumber(1e5,1e10)
				});
			}
		}

		onMounted(() => generateDocuments())

		const allColumns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"meta": {
					"link": "ProjectDetail",
					"checkbox": "completed" 
				}
			}, {
				"title": "Collaborators",
				"key": "collaborators",
				"cell": "CellCollaborators"
			}, {
				"title": "Tasks Left",
				"key": "tasks",
				"cell": "CellTasks",
				"align": "right"
			}, {
				"title": "Cost",
				"key": "fixedBudget",
				"cell": "CellPrice",
				"align": "right"
			}, {
				"title": "Status",
				"key": "status",
				"cell": "CellStatus",
				"align": "right"
			}, {
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right"
			}, {
				"title": "End Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"meta": {
					"overdueWarning": true
				}
			},
			{
				"key": "dropdown",
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit },
						{ "title": "Duplicate", "action": handleClickDuplicate },
						{ "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		const columns = computed(() => {
			return allColumns.filter(column => visibleColumns.value.includes(column.key))
		})

		const filters = [
			{
				"title": "Filter by:",
				"field": "status",
				"keys": [
					{
						"title": "All",
						"key": ""
					},
					{
						"title": "Draft",
						"key": "draft"
					},
					{
						"title": "In Progress",
						"key": "inprogress"
					}
				]
			}
		];

		return { columnsSet, visibleColumns, columns, filters, documents, generateDocuments }
	}
};
</script>


<style lang="stylus" scoped>
.c-card
	width: 100%
	overflow: hidden
// :deep(.c-table)
// 	overflow: scroll
.c-select
	max-width: 30em
	margin-left: 2em
</style>
