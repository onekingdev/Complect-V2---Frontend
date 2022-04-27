<template lang="pug">
c-table(v-bind="{columns, documents}")
</template>

<script>

import { inject } from "vue";
import { formLibraryData } from "~/data/data.js";
export default {
	"props": {
		"type": {
			"type": String,
			"default": "attestation"
		}
	},
	setup ( props ) {
		const modal = inject("modal");
		const updateForm = () => { };
		const handleClickEdit = id => modal({ "name": "cModalForm", "callback": updateForm, id });
		const handleClickDelete = id => modal({ "name": "cModalDelete", id, "title": "Form", "description": "Deleting this form will make it no longer available as a template.", "callback": updateForm });
		const handleClickDuplicate = id => modal({ "name": "cModalForm", "callback": updateForm, id, "duplicate": true });
		const columns = [
			{
				"title": "Form Name",
				"key": "name",
				"cell": "CellTitle",
				"width": "50%",
				"meta": { "link": "FormBuilder" }
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
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				},
				"align": "right"
			}
		];

		const documents = formLibraryData.filter( doc => doc.type === props.type );

		return { columns, documents };
	}
};
</script>
