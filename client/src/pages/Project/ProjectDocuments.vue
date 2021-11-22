<template lang="pug">
c-card(title="Documents")
	template(#controls)
		c-button(title="Upload" type="primary")
	template(#content)
		c-table(v-bind="{options, documents}")
</template>


<script>
export default {
	setup () {
		const options = {
			"columns": {
				"title": "Name",
				"owner": "Owner",
				"size": "Size",
				"modified": "Last Modified"
			}
		};

		const documents = [
		];


		return {
			options,
			documents
		};
	}
};
</script>
