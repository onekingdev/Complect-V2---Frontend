<template lang="pug">
document-container(section="Projects" :title="document.title" owner="Company Name")
	template(#add-controls)
		c-checkbox(label="Show on Calendar")

	template(#controls)
		c-button(title="Post Project")
		c-button-modal(title="Mark as Complete" modalTitle="Complete Project" type="primary")
			template(#content)
				icon.col-1(name="success" size="big")
				.text.col-5
					p This will mark the project as complete and close the project to further edits.
					b Do you want to continue?
			template(#footer)
				c-button(title="Confirm" type="primary" @click="markAsComplete()")
		c-button(type="icon" icon="close" size="small" @click="closeProject()")

	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.name}") {{ $locale(tab.title)}}
	template(#navigation-controls)
		c-dropdown(title="Actions")
			c-button-modal(title="Edit" modalTitle="Edit Project" type="transparent")
				template(#content)
					c-field.col-full(label="Project Name" v-model="document.title" required)
					c-field.col-3(label="Start Date" type="date" v-model="document.starts_at" required)
					c-field.col-3(label="End Date" type="date" v-model="document.ends_at" required)
					c-field.col-full(label="Description" v-model="document.description")
				template(#footer)
					c-button(title="Save" type="primary" @click="updateProject()")
			c-button-modal(title="Delete" modalTitle="Delete Project" type="transparent")
				template(#content)
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
		const { documentToStore, clearStore, document, updateDocument, deleteDocuments } = useData( "projects" );
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

		const markAsComplete = () => updateDocument( document._id, { "completed": true });
		const closeProject = () => router.push({ "name": "ProjectsOverview" });
		const updateProject = () => console.log( "Update Project" );

		const deleteProject = ( _id ) => {
			deleteDocuments( _id );
			closeProject();
		};

		onMounted( () => documentToStore( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			document,
			tabs,
			markAsComplete,
			closeProject,
			updateProject,
			deleteProject
		};
	}
};
</script>


<style lang="stylus" scoped>
// .flex-100-right
// 	flex: 1 1 100%
</style>
