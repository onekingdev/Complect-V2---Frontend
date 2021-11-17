<template lang="pug">
//- .controls
//- 	slot(name="controls")
table
	thead
		tr
			th(v-for="(title, key) in options.columns")
				column-title(
					:title="title"
					:class="`cell cell-${key}`")
	tbody(v-if="records.length")
		tr(v-for="row in records")
			td(v-for="(cell, key) in options.columns")
				component(
					:is="component(key)" :data="row[key]"
					:link="row._id"
					:class="`cell cell-${key}`")
icon(v-if="!records.length" name="empty-state")
</template>

<script>
import ColumnTitle from "./Cells/ColumnTitle.vue";
import CellDefault from "./Cells/CellDefault.vue";
import CellLink from "./Cells/CellLink.vue";
import CellStatus from "./Cells/CellStatus.vue";
import CellDate from "./Cells/CellDate.vue";
import CellCollaborators from "./Cells/CellCollaborators.vue";
import CellTasks from "./Cells/CellTasks.vue";
import CellCost from "./Cells/CellCost.vue";
export default {
	"components": {
		ColumnTitle,
		CellDefault,
		CellLink,
		CellStatus,
		CellDate,
		CellCollaborators,
		CellTasks,
		CellCost
	},
	"props": {
		"options": {
			"type": Object,
			"required": true
		},
		"records": {
			"type": Array,
			"required": true
		}
	},
	setup () {
		const cellsDict = {
			"default": "CellDefault",
			"title": "CellLink",
			"collaborators": "CellCollaborators",
			"tasks": "CellTasks",
			"status": "CellStatus",
			"starts_at": "CellDate",
			"ends_at": "CellDate",
			"fixed_budget": "CellCost"
		};
		const component = key => cellsDict[key] ? cellsDict[key] : cellsDict.default;
		return { component };
	}
};
</script>

<style lang="stylus" scoped>
.controls
	margin-bottom: 2em
	display: flex
	gap: 1em
svg.icon-empty-state
	width: 8em
	height: 8em
	display: block
	margin: 3em auto
table
	font-size: 0.85em
	width: 100%
	tr
		border-bottom: 1px solid var(--c-border)
		th, td
			padding: 0.7em 1em
			overflow: hidden
			text-overflow: ellipsis
			white-space: nowrap
</style>
