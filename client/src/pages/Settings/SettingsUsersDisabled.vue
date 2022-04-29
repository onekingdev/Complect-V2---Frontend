<template lang="pug">
c-table(v-bind="{columns, documents: disabledUsers}" searchable)
	template(#actions)
		settings-users-actions
c-modal(title="Reactivate User" v-model="isReactiveUserVisible")
	template(#content)
		p.text-small
			| You are reactivating the user's account on Complect. All of the user's historical information was retained,
			| so all user activity will be available to the user again. Reactivating this user will also require an available seat.
	template(#footer)
		c-button(title="Confirm" type="primary" @click="reactiveUser()")
</template>


<script>
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";
import cModal from "~/components/Misc/cModal.vue";
import useTeamMember from "~/store/TeamMember.js";

export default {
	"components": { SettingsUsersActions, cModal },
	setup () {
		const {
			isReactiveUserVisible,
			disabledUsers,
			handleEditUser,
			handleDeleteUser,
			handleEnableUser,
			reactiveUser
		} = useTeamMember();

		const columns = [
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
				"cell": "CellReason"
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
				"title": "Disabled Date",
				"key": "disabledDate",
				"cell": "CellDate"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleEditUser }, { "title": "Reactivate", "action": handleEnableUser }, { "title": "Delete", "action": handleDeleteUser }
					]
				}
			}
		];

		return {
			isReactiveUserVisible,
			disabledUsers,
			columns,
			reactiveUser
		};
	}
};
</script>
