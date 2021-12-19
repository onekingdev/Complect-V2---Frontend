<template lang="pug">
c-table(v-bind="{columns, documents: users}" searchable)
	template(#actions)
		settings-users-actions(:users="users")
</template>


<script>
import { computed } from "vue";
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";
import useData from "~/store/Data.js";
export default {
	"components": { SettingsUsersActions },
	setup () {
		const { documents } = useData( "users" );
		const users = computed( () => documents.value.filter( document => !document.disabled ) );

		const columns = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			}, {
				"title": "Role",
				"key": "role",
				"cell": "CellRole"
			}, {
				"title": "Access Person",
				"key": "accessPerson",
				"cell": "CellAccessPerson"
			}, {
				"title": "Start Date",
				"key": "startDate",
				"cell": "CellDate"
			}
		];

		return {
			users,
			columns
		};
	}
};
</script>
