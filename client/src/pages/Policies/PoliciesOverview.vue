<template lang="pug">
c-table(v-bind="{columns, documents:allPolicies}" searchable v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
c-table(v-bind="{columns: basicColumns, documents:allPolicies}" searchable v-if="profile.role == 'Basic'")
c-modal(title="Archive Policy" v-model="isArchiveVisible")
	template(#content)
		.col-1
			icon(name="success" size="huge") 
		.col-5
			p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
			p 
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickArchive()")
c-modal(title="Delete Policy" v-model="isDeleteVisible")
	template(#content)
		.col-1
			icon(name="error" size="huge") 
		.col-5
			p Removing this policy will permanently delete all risks and tasks associated with this policy.
			p 
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>


<script>
import { onMounted, onUnmounted, ref, inject, computed } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import { useRoute, useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";

export default {
	"components": { cBanner, cModal },
	setup () {
		const policies = new useData( "policies" );
		const route = useRoute();
		const router = useRouter();
		const { profile } = useProfile();

		const notification = inject( "notification" );

		const isArchiveVisible = ref( false );
		const isDeleteVisible = ref( false );
		let clickedId = '';

		const allPolicies = computed( () => policies.getDocuments().value.filter( document => document.status !== 'archived' ) );

		const toggleArchiveModal = (id) => {
			isArchiveVisible.value = !isArchiveVisible.value;
			clickedId = id;
		}
		const toggleDeleteModal = (id) => {
			isDeleteVisible.value = !isDeleteVisible.value;
			clickedId = id;
		}

		const handleClickEdit = id => router.push({
			"name": "PolicyDetail",
			"params": { "id": id }
		});
		const handleClickArchive =  async () => {
			try {
				await policies.updateDocument( clickedId, { status: "archived" } );
				toggleArchiveModal();
				notification({
					"type": "success",
					"title": "Policy has been archived."
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
				await policies.deleteDocuments(clickedId);
				toggleDeleteModal();
				notification({
					"type": "success",
					"title": "Policy has been deleted"
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been deleted. Please try again."
				});
			}
		}
		

		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
                "unsortable": true,
				"meta": { "link": "PolicyDetail" }
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus",
			},
			{
				"title": "Last Modified",
				"key": "modifiedAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Date Created",
				"key": "createdAt",
				"cell": "CellDate",
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

		const basicColumns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
                "unsortable": true
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus",
			},
			{
				"title": "Last Modified",
				"key": "modifiedAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Date Created",
				"key": "createdAt",
				"cell": "CellDate",
				"align": "right"
			}
		];

		onMounted( () => policies.readDocuments() );
		onUnmounted( () => policies.clearStore() );
		


		return {
			columns,
			documents: policies.getDocuments(),
			isArchiveVisible,
			handleClickArchive,
			isDeleteVisible,
			handleClickDelete,
			profile,
			basicColumns,
			allPolicies
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
