<template lang="pug">
c-table(v-bind="{columns, documents: users}" searchable)
	template(#actions)
		settings-users-actions(@update-user="getData")
</template>


<script>
import { ref, onMounted, inject } from "vue";
import useData from "~/store/Data.js";
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";

export default {
	"components": { SettingsUsersActions },
	setup () {
		const modal = inject( "modal" );
		const { documents, readDocuments } = useData( "team_members" );
		const users = ref([]);

		const getData = async () => {
			await readDocuments();
			users.value = documents.value.filter( item => !item.disabled ).map( item => ({
				"user": { "firstName": item.firstName, "lastName": item.lastName },
				"name": `${item.firstName} ${item.lastName} ${item.email}`,
				"status": item.userId ? "active" : "pending",
				...item
			}) );
		};

		const callBack = { "handleSuccess": getData };

		const handleEditUser = id => modal({ "name": "cModalTeamMember", id, callBack });
		const handleDisableUser = id => modal({ "name": "cModalTeamMember", id, "modalType": "disabled", callBack });
		const handleReinvite = id => console.debug( id );
		const checkShowReInvite = id => {
			const user = users.value.find( item => item._id === id );
			if ( !user ) return false;
			return user.status === "pending";
		};

		const handleClickRoleInfor = () => {
			modal({ "name": "cModalRuleInfor" });
		};

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

		onMounted( () => getData() );

		return {
			documents,
			users,
			columns,
			getData
		};
	}
};
</script>
