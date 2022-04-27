<template lang="pug">
page-container(title="Projects")
	template(#controls)
		c-button(title="Post Job" @click="postJob()")
		c-button-modal(title="New Project" modalTitle="New Project" type="primary")
			template(#content)
				c-field(label="Project Name" v-model="newProject.name" required)
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
import UseData from "~/store/Data.js";
import { manualApi } from "~/core/api.js";
import useProfile from "~/store/Profile.js";
import { notifyMessages } from "~/data/notifications.js";

export default {
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const projects = new UseData( "projects" );
		const { profile, isBusiness } = useProfile();
		const tabs = [
			{
				"title": "Jobs",
				"routeName": "JobsOverview"
			}, {
				"title": "Contacts",
				"routeName": "JobsContacts"
			}, {
				"title": "Ratings and Reviews",
				"routeName": "JobsRatings"
			}
		];


		const postJob = async () => {
			const response = await manualApi({
				"method": "get",
				"url": `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
			});
			if ( response.data && response.data.length > 0 ) router.push({ "name": "ProjectPostNew" });
			else {
				router.push({ "name": "BillingPlan" });
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.job.post.validate
				});
			}
		};

		const newProject = ref({
			"name": "",
			"startsAt": Date.now(),
			"endsAt": Date.now() + 864e5,
			"description": "",
			"collaborators": [],
			"tasks": [],
			"fixedBudget": 0,
			"status": "draft"
		});


		const createProject = async () => {
			try {
				newProject.value.creator = profile.value._id;
				newProject.value.collaborators = profile.value;
				const projectId = await projects.createDocuments([newProject.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.project.create.success
				});
				router.push({
					"name": "ProjectDetail",
					"params": { "id": projectId[0] }
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.project.create.error
				});
			}
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
