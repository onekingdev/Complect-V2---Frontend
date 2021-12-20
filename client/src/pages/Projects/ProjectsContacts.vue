<template lang="pug">
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
				"title": "Location",
				"key": "location",
				"type": "title"
			}, {
				"title": "Status",
				"key": "status",
				"type": "status"
			}, {
				"title": "Rating",
				"key": "rating",
				"type": "rating"
			}
		];

		const documents = [{
			"name": "Specialist",
			"location": "USA",
			"status": "complete",
			"rating": {
				"max": 5,
				"value": 3
			}
		}];

		return {
			columns,
			documents
		};
	}
};
</script>
