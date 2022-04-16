<template lang="pug">
c-table(v-bind="{columns, documents}")
</template>

<script>

export default {
	"props": {
		"type": {
			"type": String,
			"default": "attestation"
		}
	},
	setup () {
		const handleClickEdit = () => {};
		const handleClickDelete = () => {};
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

		return { columns, documents };
	}
};
</script>
