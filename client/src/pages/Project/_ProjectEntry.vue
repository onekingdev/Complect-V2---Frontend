<template lang="pug">
document-container(section="Projects" :title="document.title" owner="Company Name")
	template(#add-controls)
		c-checkbox(label="Show on Calendar")

	template(#controls)
		c-button(title="Post Project")
		c-button-modal(v-if="!document.completed" title="Mark as Complete" modalTitle="Complete Project" type="primary")
			template(#content)
				icon.col-1(name="success" size="big")
				.text.col-5
					p This will mark the project as complete and close the project to further edits.
					b Do you want to continue?
			template(#footer)
				c-button(title="Confirm" type="primary" @click="markAsComplete()")
		c-button(type="icon" iconL="close" size="small" @click="closeProject()")

	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
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
			c-button(title="Delete" type="transparent" @click="deleteProject()")
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
		const { document, readDocument, clearStore, updateDocument, deleteDocuments } = useData( "projects" );
		const route = useRoute();
		const router = useRouter();


		const tabs = [
			{
				"title": "Detail",
				"routeName": "ProjectDetail"
			}, {
				"title": "Tasks",
				"routeName": "ProjectTasks"
			}, {
				"title": "Documents",
				"routeName": "ProjectDocuments"
			}, {
				"title": "Collaborators",
				"routeName": "ProjectCollaborators"
			}
		];


		const closeProject = () => router.push({ "name": "ProjectsOverview" });
		const updateProject = () => console.log( "Update Project" );

		const markAsComplete = () => {
			updateDocument( document.value._id, {
				"status": "complete",
				"completed": true
			});
			closeProject();
		};
		const deleteProject = () => {
			deleteDocuments( document.value._id );
			closeProject();
		};

		onMounted( () => readDocument( route.params.id ) );
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
