<template lang="pug">
// c-table(v-bind="{columns, documents:allPolicies}" searchable v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
// c-table(v-bind="{columns: basicColumns, documents:allPolicies}" searchable v-if="profile.role == 'Basic'")
c-table(v-bind="{columns, documents:allPolicies}" searchable :isdraggable="isdraggable")
c-modal(title="Archive Policy" v-model="isArchiveVisible")
	template(#content)
		.delete-container
			div
				icon(name="warning" size="big")
			.description
				p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickArchive()")
c-modal(title="Delete Policy" v-model="isDeleteVisible")
	template(#content)
		.delete-container
			div
				icon(name="error" size="big")
			.description
				p Removing this policy will permanently delete all risks and tasks associated with this policy.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>


<script>
import { onMounted, onUnmounted, ref, inject, computed } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";

export default {
	"components": { cBanner, cModal },
	// eslint-disable-next-line max-lines-per-function
	setup () {
		const policies = new UseData( "policies" );
		const router = useRouter();
		const { profile } = useProfile();
		const notification = inject( "notification" );
		const isArchiveVisible = ref( false );
		const isDeleteVisible = ref( false );
		let clickedId;
		const allPolicies = computed( () => policies.getDocuments().value.filter( document => document.status !== "archived" ).sort( ( pol1, pol2 ) => pol1.order - pol2.order ) );
		const toggleArchiveModal = id => {
			isArchiveVisible.value = !isArchiveVisible.value;
			clickedId = id;
		};
		const isdraggable = {
			"action": event => {
				console.debug( event );
				// const { oldIndex, newIndex } = event.moved;
				// console.log(oldIndex, newIndex);
				// console.log(allPolicies.value);
				// if ( oldIndex > newIndex ) {
				// 	for ( let i = newIndex; i < oldIndex; i++ ) {
				// 		const currentOrder = allPolicies.value[i + 1].order;
				// 		console.log(i, allPolicies.value[i]._id);
				// 		policies.updateDocument( allPolicies.value[i]._id, { "order": currentOrder });
				// 	}
				// 	policies.updateDocument( allPolicies.value[oldIndex]._id, { "order": allPolicies.value[newIndex].order });
				// } else {
				// 	policies.updateDocument( allPolicies.value[oldIndex]._id, { "order": allPolicies.value[newIndex].order });
				// 	for ( let i = oldIndex + 1; i <= newIndex; i++ ) {
				// 		const currentOrder = allPolicies.value[i - 1].order;
				// 		policies.updateDocument( allPolicies.value[i]._id, { "order": currentOrder });
				// 	}
				// }
			}
		};
		const toggleDeleteModal = id => {
			isDeleteVisible.value = !isDeleteVisible.value;
			clickedId = id;
		};
		const handleClickEdit = id => router.push({
			"name": "PolicyDetail",
			"params": { id }
		});
		const handleClickArchive = async () => {
			try {
				await policies.updateDocument( clickedId, { "status": "archived", "tasks": [] });
				toggleArchiveModal();
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been archived."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been archived. Please try again."
				});
			}
		};
		const handleClickDelete = async () => {
			try {
				await policies.deleteDocuments( clickedId );
				toggleDeleteModal();
				notification({
					"type": "success",
					"title": "Success",
					"message": "Policy has been deleted"
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been deleted. Please try again."
				});
			}
		};
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"unsortable": true,
				"width": "50%",
				"meta": { "link": "PolicyDetail" }
			},
			{
				"title": "Status",
				"key": "status",
				"unsortable": true,
				"cell": "CellStatus"
			},
			{
				"title": "Last Modified",
				"key": "modifiedAt",
				"cell": "CellDate",
				"unsortable": true,
				"align": "right"
			},
			{
				"title": "Date Created",
				"key": "createdAt",
				"cell": "CellDate",
				"unsortable": true,
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Archive", "action": toggleArchiveModal }, { "title": "Delete", "action": toggleDeleteModal }
					]
				}
			}
		];
		// const basicColumns = [
		// 	{
		// 		"title": "Name",
		// 		"key": "name",
		// 		"cell": "CellTitle",
		// 		"unsortable": true
		// 	},
		// 	{
		// 		"title": "Status",
		// 		"key": "status",
		// 		"cell": "CellStatus",
		// 	},
		// 	{
		// 		"title": "Last Modified",
		// 		"key": "modifiedAt",
		// 		"cell": "CellDate",
		// 		"align": "right"
		// 	},
		// 	{
		// 		"title": "Date Created",
		// 		"key": "createdAt",
		// 		"cell": "CellDate",
		// 		"align": "right"
		// 	}
		// ];

		onMounted( () => policies.readDocuments() );
		onUnmounted( () => policies.clearStore() );
		return {
			columns,
			"documents": policies.getDocuments(),
			isArchiveVisible,
			handleClickArchive,
			isDeleteVisible,
			handleClickDelete,
			profile,
			// basicColumns,
			allPolicies,
			isdraggable
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
.delete-container
	display: flex
	gap: 1.25em
	.description
		font-size: 0.875em
		.confirm
			padding-top: 0.625em
			font-weight: bold
</style>
