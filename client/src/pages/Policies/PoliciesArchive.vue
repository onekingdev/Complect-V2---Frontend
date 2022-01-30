<template lang="pug">
c-table(v-bind="{columns, documents}" searchable v-if="profile.role == 'Admin' || profile.role == 'Trusted'")
c-table(v-bind="{columns: basicColumns, documents}" searchable v-if="profile.role == 'Basic'")
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
import { onMounted, onUnmounted, ref, inject } from "vue";
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
			await policies.updateDocument( clickedId, { status: "Draft" } );
			toggleUnarchiveModal();
			notification({
				"type": "success",
				"title": "Policy has been Unachived"
			});
		} 
        const handleClickDelete = async () => {
			await policies.deleteDocuments( clickedId );
			toggleDeleteModal();
			notification({
				"type": "success",
				"title": "Policy has been deleted"
			});
		}

		
        
		

		const columns = [
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

		onMounted( () => policies.readDocuments('', {status: 'Archived'}) );
		onUnmounted( () => policies.clearStore() );
		


		return {
			columns,
			basicColumns,
			documents: policies.getDocuments(),
			isDeleteVisible,
			isUnarchiveVisible,
			handleClickDelete,
			handleClickUnarchive,
			profile
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
