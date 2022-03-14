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
import { ref, inject } from "vue";
import teamMember from "~/core/teamMember.js";
import SettingsUsersActions from "~/components/Helpers/SettingsUsersActions.vue";
import cModal from "~/components/Misc/cModal.vue";
import useTeamMember from "~/store/TeamMember.js";

const COLLECTION_NAME = "team_members";
export default {
	"components": { SettingsUsersActions, cModal },
	setup () {
		const {
			modal,
			disabledUsers,
			getData
		} = useTeamMember();
		const notification = inject( "notification" );
		const isReactiveUserVisible = ref( false );
		const enableUserId = ref( null );

		const callBack = { "handleSuccess": getData };

		const handleEditUser = id => modal({ "name": "cModalTeamMember", id, callBack });
		const handleEnableUser = id => {
			isReactiveUserVisible.value = true;
			enableUserId.value = id;
		};
		const handleDeleteUser = id => {
			modal({
				"name": "cModalDelete",
				id,
				"title": "Delete User",
				"description": "Removing the user will permanently delete them and all of their associated records from the system. This action is most appropriate if a user account was created in error. Otherwise, please consider disabling the user instead in order to retain records of their prior activities on Complect.",
				"collection": COLLECTION_NAME
			});
		};

		const { toggleDisable } = teamMember();
		const reactiveUser = async () => {
			const user = disabledUsers.value.find( item => item._id === enableUserId.value );
			if ( !user ) return;

			const form = {
				"_id": user._id,
				"disabled": user.disabled,
				"disabledReason": "",
				"disabledReasonInfor": ""
			};

			try {
				await toggleDisable( form );
				isReactiveUserVisible.value = false;
				notification({
					"title": "Success",
					"message": "User has been reactivated."
				});

				getData();
			} catch ( err ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "User has not been reactivated. Please try again."
				});
			}
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


<style lang="stylus" scoped>
.text-small
	font-size: 0.85em;
</style>
