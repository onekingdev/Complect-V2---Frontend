<template lang="pug">
c-banner(
	v-if="document.status === 'draft'"
	type="info"
	title="Your job posting is currently in draft"
	message="Finish the posting to submit it to our job board.")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")

card-container(title="Project Details")
	template(#controls)
		c-button(title="Edit" type="primary")
	template(#content)
		definition-list(:data="projectDetails")

card-container(title="Collaborators")
	template(#controls)
		c-button(title="View All" type="link")

card-container(title="Discussion")
</template>


<script>
import { computed } from "vue";
import cBanner from "~/components/Misc/cBanner.vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import useData from "~/store/Data.js";
import { formatDate } from "~/core/utils.js";
export default {
	"components": {
		cBanner,
		definitionList
	},
	setup () {
		const { document } = useData( "projects" );

		const projectDetails = computed( () => ({
			"title": document.value.title,
			"startsAt": formatDate( document.value.startsAt ),
			"endsAt": formatDate( document.value.endsAt ),
			"description": document.value.description
		}) );

		return {
			projectDetails,
			document
		};
	}
};
</script>
