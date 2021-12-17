<template lang="pug">
c-card(title="Table" type="flex-column")
	template(#header-controls)
		c-button(iconL="refresh" @click="generateDocuments()" type="transparent")
		//- c-dropdown(title="Columns")
			c-toggle(v-for="column in options.columns" :title="column.title" :value="column.key" v-model="visibleColumns")
		
	template(#content)
		c-table(v-bind="{columns, documents, filters}" searchable)
</template>


<script>
import { ref, onMounted } from "vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cToggle from "~/components/Inputs/cToggle.vue"
import { randomMongoId, randomBool, randomNumber, randomElement } from "~/_devmode/generator/components/atoms/utils.js";
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js";


export default {
	components: { cDropdown, cToggle },
	setup() {
		const documents = ref([])

		const visibleColumns = ref([])
		const toggleColumnVisibility = (key, state) => visibleColumns.value[key] = state
		
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
					"fixed_budget": Math.round( randomNumber( 100, 20000 ) / 100 ) * 100,
					"created": startDate + randomNumber(-1e5,-1e3),
					"modified": startDate + randomNumber(-1e2,0),
					"status": randomElement(["draft", "inprogress", "complete"]),
					"starts_at": startDate,
					"ends_at": startDate + randomNumber(1e5,1e10),
				});
			}
		}

		onMounted(() => generateDocuments())

		

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"type": "title",
				"meta": {
					"link": "ProjectDetail",
					"checkbox": "completed" 
				}
			}, {
				"title": "Collaborators",
				"key": "collaborators",
				"type": "collaborators",
			}, {
				"title": "Tasks Left",
				"key": "tasks",
				"type": "tasks",
				"align": "right"
			}, {
				"title": "Cost",
				"key": "fixed_budget",
				"type": "price",
				"align": "right"
			}, {
				"title": "Status",
				"key": "status",
				"type": "status",
				"align": "right"
			}, {
				"title": "Start Date",
				"key": "starts_at",
				"type": "date",
				"align": "right"
			}, {
				"title": "End Date",
				"key": "ends_at",
				"type": "date",
				"align": "right",
				"meta": {
					"overdueWarning": true
				}
			}
		];

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

		return { visibleColumns, toggleColumnVisibility, columns, filters, documents, generateDocuments }
	}
};
</script>


<style lang="stylus" scoped>

</style>
