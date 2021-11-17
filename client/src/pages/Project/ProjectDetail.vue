<template lang="pug">
c-banner(
	type="info"
	title="Your job posting is currently in draft"
	message="Finish the posting to submit it to our job board.")
	template(v-slot:controls)
		c-button(title="View")
		c-button(type="icon" icon="close")

c-card(title="Project Details")
	template(v-slot:controls)
		c-button(title="Edit" type="primary")
	template(v-slot:content)
		definition-list(:data="projectDetails")

c-card(title="Collaborators")
	template(v-slot:controls)
		c-button(title="View All" type="link")

c-card(title="Discussion")
</template>


<script>
import { computed } from "vue";
import cBanner from "~/components/Misc/Banner.vue";
import cCard from "~/components/Misc/Card.vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cTable from "~/components/Table/Table.vue";
import useData from "~/store/Data.js";
export default {
	"components": {
		cBanner,
		cCard,
		definitionList,
		cTable
	},
	setup () {
		const { document } = useData( "projects" );

		const projectDetails = computed( () => ({
			"title": document.value.title,
			"starts_at": document.value.starts_at,
			"ends_at": document.value.ends_at,
			"description": document.value.description
		}) );

		const options = { "columns": { "title": "Name" } };

		const documents = [
			{ "title": "1" }
		];


		return {
			projectDetails,
			options,
			document,
			documents
		};
	}
};
</script>
