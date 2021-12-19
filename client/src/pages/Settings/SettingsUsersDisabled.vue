<template lang="pug">
c-table(v-bind="{columns, documents: users}" searchable)
	template(#actions)
		settings-users-actions(:users="users")
</template>


<script>
import { computed } from "vue";
import useData from "~/store/Data.js";
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";
export default {
	"components": { SettingsUsersActions },
	setup () {
		const { documents } = useData( "users" );
		const users = computed( () => documents.value.filter( document => document.disabled ) );

		const columns = [
			{
				"title": "Name",
				"key": "user",
				"type": "user"
			},
			{
				"title": "Role",
				"key": "role",
				"type": "role"
			},
			{
				"title": "Reason",
				"key": "reason",
				"type": "reason"
			},
			{
				"title": "Access Person",
				"key": "accessPerson",
				"type": "accessPerson"
			},
			{
				"title": "Start Date",
				"key": "startDate",
				"type": "date"
			},
			{
				"title": "Disabled Date",
				"key": "disabledDate",
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
