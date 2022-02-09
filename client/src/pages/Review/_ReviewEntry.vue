<template lang="pug">
page-container(section="Internal Review" :title="document.title" type="document")
	template(#controls)
		c-button(title="Export" @click="exportReview()")
		c-button(title="Save and Exit" type="primary" @click="saveAndExit()")
		c-button(type="icon" iconL="close" size="small" @click="closeDetail()")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title) }}
	template(#navigation-controls)
		c-dropdown(title="Actions" wide)
			c-button(title="Edit" type="transparent" @click="editReview()")
			c-button-modal(title="Delete" type="transparent" modalTitle="Delete Internal Review")
				template(#content)
					.col-1
						icon(name="error" size="huge")
					.col-5
						p Removing this internal review will delete any progress, tasks, and documents associated with the review.
						p
							b Do you want to continue?
				template(#footer)
					c-button(title="Confirm" type="primary" @click="deleteReiew()")
	template(#content)
		router-view
</template>


<script>
import { onMounted, onUnmounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import useData from "~/store/Data.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
export default {
	"components": {
		cDropdown,
		cCheckbox
	},
	setup () {
		const { document, readDocuments, deleteDocuments, clearStore } = useData( "reviews" );
		const route = useRoute();
		const notification = inject( "notification" );
		const router = useRouter();
		const modal = inject( "modal" );

		const tabs = [
			{
				"title": "Detail",
				"routeName": "ReviewDetail"
			}, {
				"title": "Tasks",
				"routeName": "ReviewTasks"
			}, {
				"title": "Documents",
				"routeName": "ReviewDocuments"
			}
		];

		const editReview = () => modal({ "name": "cModalReview", "id": document.value._id });

		const deleteReiew = async () => {
			try {
				await deleteDocuments( route.params.id );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Internal review has been deleted."
				});
				router.push({ "name": "ReviewsOverview" });
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal review has not been deleted. Please try again."
				});
			}
		};

		const closeDetail = () => router.push({ "name": "ReviewsOverview" });

		const exportReview = () => {
			let flag;
			flag = true;
			flag = flag && document.value.completedAt;
			document.value.categories.forEach( category => {
				flag = flag && category.completedAt;
			});
			if ( flag ) console.debug( "Download start!!!" );
			else {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Internal Review report cannot be generated until all categories have been marked as complete."
				});
			}
		};

		const saveAndExit = () => router.push({ "name": "ReviewsOverview" });

		onMounted( () => readDocuments( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			tabs,
			document,
			editReview,
			exportReview,
			saveAndExit,
			closeDetail,
			deleteReiew
		};
	}
};
</script>
