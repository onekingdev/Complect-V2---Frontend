<template lang="pug">
c-banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
	template(#controls)
		a(href='https://www.sec.gov/exams' target='_blank')
			c-button(title="View" @click="viewPolicy()")
.rules-block Rule 206(4)-7 under the Advisers Act requires that you conduct a review of your compliance program no less than annually. You can document this review and other internal reviews here.
c-modal(title="Delete Internal Review" v-model="isModalVisible")
	template(#content)
		img.minuse.col-1(src="/img/error_20.5080af0b.svg")
		.text.col-5
			p Removing this internal review will delete any progress and tasks associated with the file.
			b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="deleteReview()")
c-table(v-bind="{columns, documents}")
</template>


<script>
import { onMounted, onUnmounted, inject, ref } from "vue";
import useData from "~/store/Data.js";
import { useRouter } from "vue-router";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cBanner, cModal },
	setup () {
		const { documents, readDocuments, createDocuments, deleteDocuments, clearStore } = useData( "reviews" );
		const router = useRouter();
		const notification = inject( "notification" );
		const isModalVisible = ref( false );
		let selectedId = null;

		const handleClickEdit = id => {
			router.push({
				"name": "ReviewDetail",
				"params": { id }
			});
		};

		const handleClickDelete = id => {
			selectedId = id;
			isModalVisible.value = !isModalVisible.value;
		}

		const handleClickDuplicate = async id => {
			const index = documents.value.findIndex( doc => doc._id === id );
			try {
				await createDocuments([documents.value[index]]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been duplicated."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been duplicated. Please try again."
				});
			}
		};

		const deleteReview = async () => {
			if(!selectedId) return;

			try {
				await deleteDocuments( selectedId );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been deleted."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been deleted. Please try again."
				});
			} finally {
				isModalVisible.value = !isModalVisible.value;
			}
		}

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellTitle",
				"width": "25%",
				"meta": { "link": "ReviewDetail" }
			},
			{
				"title": "Progress",
				"key": "progress",
				"cell": "CellProgress",
				"width": "25%"
			},
			{
				"title": "Findings",
				"key": "finding",
				"cell": "CellDefault",
				"align": "right"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Date Created",
				"key": "dateCreated",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "Review Period End Date	",
				"key": "reviewPeriod",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"width": "35px",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );

		return {
			columns,
			documents,
			isModalVisible,
			deleteReview
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
.minuse
	width: 1.5em
	height: 1.5em
	margin: 0 auto
</style>
