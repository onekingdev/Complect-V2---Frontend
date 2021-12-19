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
				"type": "user"
			}, {
				"title": "Role",
				"key": "role",
				"type": "role"
			}, {
				"title": "Access Person",
				"key": "accessPerson",
				"type": "accessPerson"
			}, {
				"title": "Start Date",
				"key": "startDate",
				"type": "date"
			}
		];

		return {
			users,
			columns
		};
	}
};
</script>
