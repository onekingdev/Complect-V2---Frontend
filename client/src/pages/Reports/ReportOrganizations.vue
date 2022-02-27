<template lang="pug">
card-container.container(title="Access Persons" type="flex-column")
	template(#controls)
		router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
	template(#content)
		c-table(v-bind="{columns: columnsAcessPerson, documents: users}")
card-container.container(title="Terminated Employees" type="flex-column")
	template(#controls)
		router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
	template(#content)
		c-table(v-bind="{columns: terminateColumns, documents: users}")
card-container.container(title="Resignations" type="flex-column")
	template(#controls)
		router-link(:to="{ name: 'SettingsUsersDirectory' }") View all
	template(#content)
		c-table(v-bind="{columns: terminateColumns, documents: users}")
</template>

<script>
export default {
	setup () {
		const users = [{
			"user": { "firstName": "David", "lastName": "Gill", "email": "example@gmail.com" },
			"role": "trusted",
			"accessPerson": true,
			"reason": "Terminated"
		}];

		const columnsAcessPerson = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			},
			{
				"title": "Role",
				"key": "role",
				"cell": "CellRole"
			},
			{
				"title": "Access Person",
				"key": "accessPerson",
				"cell": "CellAccessPerson"
			},
			{
				"title": "Start Date",
				"key": "startDate",
				"cell": "CellDate"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit" }, { "title": "Disable" }
					]
				}
			}
		];

		const terminateColumns = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			},
			{
				"title": "Role",
				"key": "role",
				"cell": "CellRole"
			},
			{
				"title": "Reason",
				"key": "reason",
				"cell": "CellDefault"
			},
			{
				"title": "Access Person",
				"key": "accessPerson",
				"cell": "CellAccessPerson"
			},
			{
				"title": "Start Date",
				"key": "startDate",
				"cell": "CellDate"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Reactivate" }, { "title": "Delete" }
					]
				}
			}
		];

		return {
			users,
			columnsAcessPerson,
			terminateColumns
		};
	}
};
</script>

<style lang="stylus" scoped>
.container
	margin: 1em 0
</style>
