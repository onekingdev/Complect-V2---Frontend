<template lang="pug">
c-card(title="Documents")
	template(#header-controls)
		c-button(title="Upload" type="primary")
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
				"title": "Owner",
				"key": "owner",
				"cell": "CellTitle"
			}, {
				"title": "Size",
				"key": "size",
				"cell": "CellTitle"
			}, {
				"title": "Last Modified",
				"key": "lastModified",
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
