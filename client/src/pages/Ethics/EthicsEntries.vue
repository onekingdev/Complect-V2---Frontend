<template lang="pug">
page-container(:title="title")
	template(#content)
		c-table(v-bind="{columns, documents, filters}")
</template>

<script>

import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { ethicsData } from "~/data/data.js";

export default {
	setup () {
		const route = useRoute();
		const router = useRouter();
		const titles = { "trade": "Personal Trade Monitoring", "attestation": "Attestation", "logs": "Logs" , "approval": "Pre-Approval" };
		const title = computed( () => titles[route.query.type] );
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"width": "35%",
				"meta": { "link": "FormBuilder" }
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate"
			},
			{
				"title": "Last Modified By",
				"key": "lastModifiedBy",
				"cell": "CellDefault"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate"
			}
		];

		const filters = [
			{
				"title": "Sort By:",
				"field": "status",
				"keys": [
					{
						"title": "Date Submitted",
						"key": ""
					},
					{
						"title": "Date Reviewed",
						"key": "draft"
					},
					{
						"title": "Date of Transaction",
						"key": "inprogress"
					}
				]
			}
		];

		const documents = computed( () => ethicsData.filter( doc => doc.type === route.query.type ));

		return { columns, documents, filters, title };
	}
};
</script>

<style lang="stylus" scoped>
.c-table
	:deep(.controls)
		margin-bottom: 0
</style>
