<template lang="pug">
c-banner(title="Key Regulatory Developments 2021" message="New regulatory changes can have an impact on your policies and procedures.")
	template(#controls)
		a(href='https://www.sec.gov/exams' target='_blank')
			c-button(title="View" @click="viewPolicy()")
.rules-block Rule 206(4)-7 under the Advisers Act requires that you conduct a review of your compliance program no less than annually. You can document this review and other internal reviews here.
c-table(v-bind="{columns, documents}")
c-modal(title="Delete Internal Review" v-model="isDeleteVisible")
	template(#content)
		.col-1
			icon(name="error" size="huge")
		.col-5
			p Removing this internal review will delete any progress, tasks, and documents associated with the review.
			p
				b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="handleClickDelete()")
</template>


<script>
import { onMounted, onUnmounted, inject, ref } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cBanner, cModal },
	setup () {
		const { documents, readDocuments, deleteDocuments, createDocuments, clearStore } = useData( "reviews" );
		const notification = inject( "notification" );
		const modal = inject( "modal" );
		const isDeleteVisible = ref( false );
		let clickedId;

		const toggleDeleteModal = id => {
			isDeleteVisible.value = !isDeleteVisible.value;
			clickedId = id;
		};

		const handleClickEdit = id => modal({ "name": "cModalReview", id });

		const handleClickDelete = async () => {
			try {
				await deleteDocuments( clickedId );
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
			}
		};

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
				"unsortable": true,
				"cell": "CellDropdown",
				"width": "35px",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Duplicate", "action": handleClickDuplicate }, { "title": "Delete", "action": toggleDeleteModal }
					]
				}
			}
		];

		const getProgress = review => {
			let max, current = 0, finding = 0;
			max = review.categories.length + 1;
			if ( review.completedAt ) current++;
			review.categories.forEach( category => {
				if ( category.completedAt ) current++;
				category.content.forEach( topic => {
					topic.items.forEach( item => {
						finding += item.finding.length;
					});
				});
			});
			review.progress = {
				"max": max,
				"current": current
			};
			review.finding = finding;
		};

		onMounted( async () => {
			await readDocuments();
			documents.value.forEach( review => {
				getProgress( review );
			});
		});

		onUnmounted( () => clearStore() );

		return {
			columns,
			documents,
			isDeleteVisible,
			handleClickDelete
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
