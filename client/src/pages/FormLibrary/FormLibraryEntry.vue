<template lang="pug">
page-container(:title="title")
	template(#quick-access)
		span.home-tab(@click="goToHome()") Form Library
		span.separator &nbsp;/&nbsp;
		span.sub-tab {{ title }}
	template(#controls)
		c-button(title="New Form" type="primary" @click="createNewForm()")
	template(#content)
		c-table(v-bind="{columns, documents}")
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

export default {
	setup () {
		const route = useRoute();
		const router = useRouter();
		const title = computed( () => route.query.title );
		const handleClickEdit = () => {};
		const handleClickDelete = () => {};
		const goToHome = () => router.push({ "name": "FormLibrary" });

		const columns = [
			{
				"title": "Form Name",
				"key": "name",
				"cell": "CellTitle",
				"width": "50%",
				"meta": { "link": "ReviewDetail" }
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Created By",
				"key": "owner",
				"cell": "CellDefault",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Delete", "action": handleClickDelete }
					]
				},
				"align": "right"
			}
		];

		const documents = [
			{
				"name": "new form",
				"status": "pending",
				"dateCreated": 1647000337214,
				"owner": "System"
			}, {
				"name": "new form1",
				"status": "complete",
				"dateCreated": 1647000337214,
				"owner": "System"
			}
		];

		const createNewForm = () => {};
		return { title, columns, documents, createNewForm, goToHome }
	}
};
</script>

<style lang="stylus" scoped>
.page-container
	:deep(.page-name)
		flex-direction: column
		align-items: flex-start !important
	:deep(.quick-access)
		font-size: 0.58333333em
	.sub-tab
		font-weight: bold
	.separator
		color: var(--c-gold)
</style>
