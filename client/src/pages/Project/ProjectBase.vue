<template lang="pug">
document-layout(section="Projects" :title="document.title" owner="Company Name")
	template(v-slot:controls)
		c-button(title="View Post")
		c-button(title="Mark as Complete" type="primary")
		c-button(type="icon" icon="close" @click="closeProject()")
	template(v-slot:tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{ $locale(tab.title)}}
	template(v-slot:content)
		router-view
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useData from "~/store/Data.js";
import documentLayout from "~/components/Layouts/DocumentLayout.vue";
export default {
	"components": { documentLayout },
	setup () {
		const { documentToStore, clearStore, document } = useData( "projects" );
		const route = useRoute();
		const router = useRouter();


		const tabs = [
			{
				"name": "ProjectDetail",
				"title": "Detail"
			}, {
				"name": "ProjectTasks",
				"title": "Tasks"
			}, {
				"name": "ProjectDocuments",
				"title": "Documents"
			}, {
				"name": "ProjectCollaborators",
				"title": "Collaborators"
			}
		];

		const closeProject = () => router.push({ "name": "Projects" });

		onMounted( () => documentToStore( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			document,
			tabs,
			closeProject
		};
	}
};
</script>


<style lang="stylus" scoped>
</style>
