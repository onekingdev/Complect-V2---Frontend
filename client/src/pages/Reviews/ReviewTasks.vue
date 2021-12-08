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
				"type": "title"
			}, {
				"title": "Assignee",
				"key": "assignee",
				"type": "title"
			}, {
				"title": "Start Date",
				"key": "start_date",
				"type": "date"
			}, {
				"title": "Due Date",
				"key": "end_date",
				"type": "date"
			}
		];

		const documents = [
		];


		return {
			columns,
			documents
		};
	}
};
</script>
