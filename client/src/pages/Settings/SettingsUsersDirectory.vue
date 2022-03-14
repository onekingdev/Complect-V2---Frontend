<template lang="pug">
c-table(v-bind="{columns, documents: activeUsers}" searchable)
	template(#actions)
		settings-users-actions(@update-user="getData")
</template>


<script>
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";
import useTeamMember from "~/store/TeamMember.js";

export default {
	"components": { SettingsUsersActions },
	setup () {
		const {
			modal,
			activeUsers,
			getData
		} = useTeamMember();

		const callBack = { "handleSuccess": getData };

		const handleEditUser = id => modal({ "name": "cModalTeamMember", id, callBack });
		const handleDisableUser = id => modal({ "name": "cModalTeamMember", id, "modalType": "disabled", callBack });
		const handleReinvite = id => console.debug( id );
		const checkShowReInvite = id => {
			const user = activeUsers.value.find( item => item._id === id );
			if ( !user ) return false;
			return user.status === "pending";
		};

		const handleClickRoleInfor = () => modal({ "name": "cModalRoleInfor" });

		const columns = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			},
			{
				"title": "Role",
				"key": "role",
				"cell": "CellRole",
				"icon": { "name": "info", "size": "medium", "handleClick": handleClickRoleInfor }
			},
			{
				"title": "Access Person",
				"key": "accessPerson",
				"cell": "CellAccessPerson"
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus"
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
						{ "title": "Edit", "action": handleEditUser }, { "title": "Disable", "action": handleDisableUser }, { "title": "Re-invite", "action": handleReinvite, "canShow": checkShowReInvite }
					]
				}
			}
		];

		return {
			activeUsers,
			columns,
			getData
		};
	}
};
</script>
