<template lang="pug">
c-card(title="Tasks")
	template(#header-controls)
		c-button(title="New Task" type="primary")
	template(#content)
		c-table(v-bind="{columns, documents}")
</template>


<script>
export default {
	setup () {
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle"
			}, {
				"title": "Assignee",
				"key": "assignee",
				"cell": "CellTitle"
			}, {
				"title": "Start Date",
				"key": "startDate",
				"cell": "CellDate"
			}, {
				"title": "Due Date",
				"key": "endDate",
				"cell": "CellDate"
			}
		];

		const documents = [];


		return {
			columns,
			documents
		};
	}
};
</script>
