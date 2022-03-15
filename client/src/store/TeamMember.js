import { ref, onMounted, inject, computed } from "vue";
import UseData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
import teamMember from "~/core/teamMember.js";

const COLLECTION_NAME = "team_members";
const teamMembers = new UseData( COLLECTION_NAME );
const { profile } = useProfile();
const { toggleDisable } = teamMember();
const users = ref([]);
const isReactiveUserVisible = ref( false );
const enableUserId = ref( null );

const formatUser = item => ({
	"user": { "firstName": item.firstName, "lastName": item.lastName, "email": item.email },
	"name": `${item.firstName} ${item.lastName} ${item.email}`,
	"reason": { "id": item._id, "disabledReason": item.disabledReason, "disabledReasonInfor": item.disabledReasonInfor },
	"status": item.userId ? "active" : "pending",
	...item
});

export default function useTeamMember () {
	const notification = inject( "notification" );
	const modal = inject( "modal" );

	const activeUsers = computed( () => users.value.filter( item => !item.disabled ).map( formatUser ) );

	const disabledUsers = computed( () => users.value.filter( item => item.disabled ).map( formatUser ) );

	const accessUsers = computed( () => activeUsers.value.filter( item => item.accessPerson ).map( formatUser ) );

	const terminateUsers = computed( () => disabledUsers.value.filter( item => item.disabledReason === "termination" ).map( formatUser ) );

	const resignationUsers = computed( () => disabledUsers.value.filter( formatUser ) );

	const usersCount = computed( () => ({
		"Total": 2,
		"Directory": activeUsers.value.length,
		"Disabled": disabledUsers.value.length
	}) );

	const getData = async () => {
		await teamMembers.readDocuments( null, { "businessId": profile.value._id });
		users.value = teamMembers.getDocuments().value;
	};

	const handleClickRoleInfor = () => modal({ "name": "cModalRoleInfor" });

	const callbackHandleSuccessUpdate = { "handleSuccess": getData };

	const handleEditUser = id => modal({ "name": "cModalTeamMember", id, "callBack": callbackHandleSuccessUpdate });
	const handleDisableUser = id => modal({ "name": "cModalTeamMember", id, "modalType": "disabled", "callBack": callbackHandleSuccessUpdate });

	const handleDeleteUser = id => {
		modal({
			"name": "cModalDelete",
			id,
			"title": "Delete User",
			"description": "Removing the user will permanently delete them and all of their associated records from the system. This action is most appropriate if a user account was created in error. Otherwise, please consider disabling the user instead in order to retain records of their prior activities on Complect.",
			"collection": COLLECTION_NAME,
			"callback": getData
		});
	};

	const handleEnableUser = id => {
		isReactiveUserVisible.value = true;
		enableUserId.value = id;
	};

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

	onMounted( () => getData() );

	return {
		modal,
		isReactiveUserVisible,
		teamMembers,
		users,
		usersCount,
		activeUsers,
		disabledUsers,
		accessUsers,
		terminateUsers,
		resignationUsers,
		getData,
		handleEditUser,
		handleDisableUser,
		handleClickRoleInfor,
		handleDeleteUser,
		handleEnableUser,
		reactiveUser
	};
}
