<template lang="pug">
c-card(title="Tasks")
	template(#controls)
		c-button(title="New Task" type="primary")
	template(#content)
		c-table(v-bind="{options, documents}")
</template>


<script>
export default {
	setup () {
		const options = {
			"columns": {
				"title": "Name",
				"assignee": "Assignee",
				"startsAt": "Start Date",
				"endsAt": "Due Date"
			}
		};

		const documents = [];


		return {
			options,
			documents
		};
	}
};
</script>
