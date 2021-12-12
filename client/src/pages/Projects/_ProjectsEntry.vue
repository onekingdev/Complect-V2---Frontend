<template lang="pug">
documents-container(title="Projects")

	template(#controls)
		c-button(title="Post Job" @click="postJob()")
		c-button-modal(title="New Project" modalTitle="New Project" type="primary")
			template(#content)
				c-field.col-full(label="Project Name" v-model="newProject.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newProject.starts_at" required)
				c-field.col-3(label="End Date" type="date" v-model="newProject.ends_at" required)
				c-field.col-full(label="Description" v-model="newProject.description")
			template(#footer)
				c-button(title="Create" type="primary" @click="createProject()")

	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
	template(#content)
		router-view
</template>


<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
export default {
	setup () {
		const toast = inject( "toast" );
		const router = useRouter();
		const { createDocuments } = useData( "projects" );
		const tabs = [
			{
				"title": "My Projects",
				"routeName": "ProjectsOverview"
			}, {
				"title": "Contacts",
				"routeName": "ProjectsContacts"
			}, {
				"title": "Ratings and Reviews",
				"routeName": "ProjectsRatings"
			}
		];


		const postJob = () => router.push({ "name": "ProjectPost" });

		const newProject = ref({
			"title": "",
			"starts_at": "",
			"ends_at": "",
			"description": ""
		});

		const inititalForm = {
			"title": "",
			"starts_at": "",
			"ends_at": "",
			"description": "",
			"collaborators": [
			],
			"tasks": [
			],
			"fixed_budget": 0,
			"status": "draft"
		};


		const resetForm = () => newProject.value = { ...inititalForm };


		// const validForm = () => {
		// 	const fields = newProject.value;
		// 	if ( !fields.title ) return;
		// 	if ( !fields.starts_at ) return;
		// 	if ( !fields.ends_at ) return;
		// 	return true;
		// };

		const createProject = async () => {
			// if(!validForm()) return
			const projectId = await createDocuments([
				newProject.value
			]);
			toast({
				"type": "success",
				"title": "Project Cteated"
			});
			resetForm();
			router.push({
				"name": "ProjectDetail",
				"params": { "id": projectId[0] }
			});
		};


		return {
			tabs,
			postJob,
			newProject,
			createProject
		};
	}
};
</script>
