<template lang="pug">
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
				"title": "Location",
				"key": "location",
				"cell": "CellTitle"
			}, {
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			}, {
				"title": "Rating",
				"key": "rating",
				"cell": "cellRating"
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
