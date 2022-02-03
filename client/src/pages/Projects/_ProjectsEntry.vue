<template lang="pug">
page-container(title="Projects")
	template(#controls)
		c-button(title="Post Job" @click="postJob()")
		c-button-modal(title="New Project" modalTitle="New Project" type="primary")
			template(#content)
				c-field(label="Project Name" v-model="newProject.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newProject.startsAt" required)
				c-field.col-3(label="End Date" type="date" v-model="newProject.endsAt" required)
				c-field(label="Description" v-model="newProject.description")
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
		const notification = inject( "notification" );
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
			"startsAt": Date.now(),
			"endsAt": Date.now() + 864e5,
			"description": "",
			"collaborators": [],
			"tasks": [],
			"fixedBudget": 0,
			"status": "draft"
		});


		const createProject = async () => {
			const projectId = await createDocuments([newProject.value]);
			notification({
				"type": "success",
				"title": "Project Cteated"
			});
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
