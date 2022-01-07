<template lang="pug">
document-container(section="Internal Review" :title="document.title")
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
		const { document, readDocuments, clearStore, deleteDocuments } = useData( "reviews" );
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
			deleteDocuments( document.value._id );
			closeReview();
		};

		onMounted( () => readDocuments( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			tabs,
			document,
			closeReview,
			updateProject,
			deleteProject
		};
	}
};
</script>
