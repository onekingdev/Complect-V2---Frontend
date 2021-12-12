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
				"type": "title"
			}, {
				"title": "Owner",
				"key": "owner",
				"type": "title"
			}, {
				"title": "Size",
				"key": "size",
				"type": "title"
			}, {
				"title": "Last Modified",
				"key": "last_modified",
				"type": "date"
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
