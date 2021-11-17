<template lang="pug">
general-layout(title="Projects")
	template(v-slot:controls)
		c-button(title="Post Job")

		c-button(title="New Project" type="primary" @click="toggleModal()")
		c-modal(:visible="isModal")
			template(v-slot:header)
				.title New Project
				icon(name="close" @click="toggleModal()")
			template(v-slot:content)
				c-field.col-full(label="Project Name" v-model="newProject.title" required)
				c-field.col-3(label="Start Date" type="date" v-model="newProject.starts_at" required)
				c-field.col-3(label="End Date" type="date" v-model="newProject.ends_at" required)
				c-field.col-full(label="Description" v-model="newProject.description")
			template(v-slot:footer)
				c-button(title="Cancel" type="link" @click="toggleModal()")
				c-button(title="Create" type="primary" @click="createProject()")

	template(v-slot:tabs)
		router-link(v-for="tab in tabs" :to="{name: tab.name}") {{ $locale(tab.title)}}
	template(v-slot:content)
		router-view
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import GeneralLayout from "~/components/Layouts/General.vue";
import cModal from "~/components/Misc/Modal.vue";
import useData from "~/store/Data.js";
export default {
	"components": {
		GeneralLayout,
		cModal
	},
	setup () {
		const router = useRouter();
		const { createDocuments } = useData( "projects" );
		const tabs = [
			{
				"name": "Projects",
				"title": "My Projects"
			}, {
				"name": "Contacts",
				"title": "Contacts"
			}, {
				"name": "Ratings",
				"title": "Ratings and Reviews"
			}
		];

		const isModal = ref( false );
		const newProject = ref({});
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
		const toggleModal = () => {
			isModal.value = !isModal.value;
			resetForm();
		};
		const createProject = async () => {
			const projectId = await createDocuments([
				newProject.value
			]);
			toggleModal();
			router.push({
				"name": "ProjectDetail",
				"params": { "id": projectId[0] }
			});
		};


		return {
			tabs,
			isModal,
			toggleModal,
			newProject,
			createProject
		};
	}
};
</script>
