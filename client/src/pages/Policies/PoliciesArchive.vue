<template lang="pug">
c-table(v-bind="{columns, documents: archivePolicies}" searchable v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
c-table(v-bind="{columns: basicColumns, documents: archivePolicies}" searchable v-if="profile.role == 'Basic'")
c-modal(title="Archive Policy" v-model="isUnarchiveVisible")
	template(#content)
		.col-1
			icon(name="warning" size="huge") 
		.col-5
			p Archiving the policy will remove it from the published compliance manual, but maintain a record of the policy and all of its linked risks and tasks.
			p 
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickUnarchive()")
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

		const isDeleteVisible = ref( false );
		const isUnarchiveVisible = ref( false );

		const archivePolicies = computed( () => policies.getDocuments().value.filter( document => document.status === 'archived' ) );
		
		let clickedId = '';

		const toggleDeleteModal = (id) => {
			isDeleteVisible.value = !isDeleteVisible.value;
			clickedId = id;
		}
		const toggleUnarchiveModal = (id) => {
			isUnarchiveVisible.value = !isUnarchiveVisible.value;
			clickedId = id;
		}

		const handleClickUnarchive =  async () => {
			try {
				await policies.updateDocument( clickedId, { status: "draft" } );
				toggleUnarchiveModal();
				notification({
					"type": "success",
					"title": "Policy has been Unarchived."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Policy has not been Unarchived. Please try again."
				});
			}
		} 
        const handleClickDelete = async () => {
			try {
				await policies.deleteDocuments( clickedId );
				toggleDeleteModal();
				notification({
					"type": "success",
					"title": "Policy has been deleted."
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
						{ "title": "Unarchive", "action": toggleUnarchiveModal }, { "title": "Delete", "action": toggleDeleteModal }
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

		onMounted( () => policies.readDocuments('', {status: 'archived'}) );
		onUnmounted( () => policies.clearStore() );
		

		return {
			columns,
			basicColumns,
			documents: policies.getDocuments(),
			isDeleteVisible,
			isUnarchiveVisible,
			handleClickDelete,
			handleClickUnarchive,
			profile,
			archivePolicies
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
