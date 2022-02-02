<template lang="pug">
page-container(section="Internal Review" :title="document.title" type="document")
	template(#controls)
		c-button(title="Download")
		c-button(title="Save and Exit" type="primary")
		c-button(type="icon" iconL="close" size="small" @click="closeReview()")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title) }}
	template(#content)
		router-view
</template>


<script>
import { onMounted, onUnmounted } from "vue";
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
		const reviews = new useData( "reviews" );
		const route = useRoute();
		const router = useRouter();

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


		const closeReview = () => router.push({ "name": "ReviewsOverview" });
		const updateProject = () => {};


		const deleteProject = () => {
			reviews.deleteDocuments( reviews.getDocument().value._id );
			closeReview();
		};

		onMounted( () => reviews.readDocuments( route.params.id ) );
		onUnmounted( () => reviews.clearStore() );

		return {
			tabs,
			document: reviews.getDocument(),
			closeReview,
			updateProject,
			deleteProject
		};
	}
};
</script>
