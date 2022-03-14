import { ref, onMounted, inject, computed } from "vue";
import UseData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";

const COLLECTION_NAME = "team_members";
const users = ref([]);

export default function useTeamMember () {
	const modal = inject( "modal" );
	const teamMembers = new UseData( COLLECTION_NAME );
	const { profile } = useProfile();

	const activeUsers = computed( () => users.value.filter( item => !item.disabled ).map( item => ({
		"user": { "firstName": item.firstName, "lastName": item.lastName, "email": item.email },
		"name": `${item.firstName} ${item.lastName} ${item.email}`,
		"status": item.userId ? "active" : "pending",
		...item
	}) ) );

	const disabledUsers = computed( () => users.value.filter( item => item.disabled ).map( item => ({
		"user": { "firstName": item.firstName, "lastName": item.lastName },
		"reason": { "id": item._id, "disabledReason": item.disabledReason, "disabledReasonInfor": item.disabledReasonInfor },
		"name": `${item.firstName} ${item.lastName} ${item.email}`,
		...item
	}) ) );

	const usersCount = computed( () => ({
		"Total": 2,
		"Directory": activeUsers.value.length,
		"Disabled": disabledUsers.value.length
	}) );

	const getData = async () => {
		await teamMembers.readDocuments( null, { "businessId": profile.value._id });
		users.value = teamMembers.getDocuments().value;
	};

	onMounted( () => getData() );

	return {
		modal,
		teamMembers,
		users,
		usersCount,
		activeUsers,
		disabledUsers,
		getData
	};
}
