<template lang="pug">
page-container(section="Projects" :title="document.name" :owner="linkaccount?.companyName" type="document")
	template(#add-controls)
		c-checkbox.show-calendar(label="Show on Calendar")

	template(#controls)
		c-button(title="Post Project"  @click="postProject()" v-if="document.creator === profile._id")
		c-button(v-if="!document.completed" title="Mark as Complete" type="primary" @click="toggleCompleteModal()")
		c-button(v-if="document.completed && document.creator === profile._id" title="Mark as Incomplete" type="primary" @click="toggleIncompleteModal()")
		c-button(title="Post Project"  @click="postProject()" v-if="document.creator !== profile._id")
		c-button(type="icon" iconL="close" size="small" @click="closeProject()")

	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
	template(#navigation-controls)
		// c-dropdown(title="Actions" v-if="document.creator === profile._id")
		c-dropdown(title="Actions")
			c-button(title="Edit" modalTitle="Edit Project" type="transparent" @click="toggleEditModal()")
			c-button(title="Delete" type="transparent" modalTitle="Remove Project" @click="toggleDeleteModal()")
	template(#content)
		router-view(v-model:projectDetail="document")
c-modal(title="Edit Project" v-model="isEditModalVisible")
	template(#content)
		c-field(label="Project Name" v-model="projectForm.name" required)
		c-field.col-3(label="Start Date" type="date" v-model="projectForm.startsAt" required)
		c-field.col-3(label="End Date" type="date" v-model="projectForm.endsAt" required)
		c-field(label="Description" v-model="projectForm.description")
	template(#footer)
		c-button(title="Save" type="primary" @click="updateProject()")
c-modal(title="Complete Project" v-model="isCompleteModalVisible")
	template(#content)
		.delete-container
			div
				icon.col-1(name="success" size="big")
			.description
				p This will mark the project as complete and close the project to further edits.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="markAsComplete()")
c-modal(title="Reactive Project" v-model="isIncompleteModalVisible")
	template(#content)
		icon.col-1(name="success" size="big")
		.description
			p This project will be reactiveated and re-accessible for editing by all collaborators.
	template(#footer)
		c-button(title="Confirm" type="primary" @click="markAsIncomplete()")
c-modal(title="Remove Project" v-model="isDeleteModalVisible")
	template(#content)
		.delete-container
			div
				icon(name="error" size="big")
			.description
				p This will delete the project and all of its related tasks, documents, and comments from your records.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="deleteProject()")
</template>


<script>
import { onMounted, onUnmounted, inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UseData from "~/store/Data.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import useProfile from "~/store/Profile.js";
import { manualApi } from "~/core/api.js";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": {
		cDropdown,
		cCheckbox,
		cModal
	},
	// eslint-disable-next-line
	setup () {
		const projects = new UseData( "projects" );
		const contracts = new UseData( "contracts" );
		const notification = inject( "notification" );
		const route = useRoute();
		const router = useRouter();
		const { profile, linkaccount } = useProfile();
		const isCompleteModalVisible = ref( false );
		const isIncompleteModalVisible = ref( false );
		const isEditModalVisible = ref( false );
		const isDeleteModalVisible = ref( false );
		const projectForm = ref({
			"name": "",
			"startsAt": "",
			"endsAt": "",
			"description": ""
		});

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

		const toggleCompleteModal = () => isCompleteModalVisible.value = !isCompleteModalVisible.value;
		const toggleIncompleteModal = () => isIncompleteModalVisible.value = !isIncompleteModalVisible.value;
		const toggleDeleteModal = () => isDeleteModalVisible.value = !isDeleteModalVisible.value;
		const toggleEditModal = () => {
			isEditModalVisible.value = !isEditModalVisible.value;
			projectForm.value.name = projects.getDocument().value.name;
			projectForm.value.startsAt = projects.getDocument().value.startsAt;
			projectForm.value.endsAt = projects.getDocument().value.endsAt;
			projectForm.value.description = projects.getDocument().value.description;
		};
		const closeProject = () => router.push({ "name": "ProjectsOverview" });
		const updateProject = async updateDocument => {
			try {
				if ( updateDocument ) projectForm.value = updateDocument;
				await projects.updateDocument( projects.getDocument().value._id, projectForm.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Project has been edited."
				});
				isEditModalVisible.value = !isEditModalVisible.value;
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Project has not been edited. Please try again."
				});
			}
		};

		const markAsComplete = async () => {
			try {
				await contracts.readDocuments( "", { "project": projects.getDocument().value._id });
				const allContracts = contracts.getDocuments();
				const hasActive = ref( false );
				// eslint-disable-next-line max-depth
				for ( let i = 0; i < allContracts.length; i++ ) if ( allContracts[i].status !== "complete" ) hasActive.value = false;
				if ( hasActive.value === true ) {
					notification({
						"type": "error",
						"title": "Error",
						"message": "Project has not been marked as complete. There is still an active contract for this project. Please end the contract to mark this project as complete."
					});
					isCompleteModalVisible.value = !isCompleteModalVisible.value;
				} else {
					await projects.updateDocument( projects.getDocument().value._id, {
						"status": "complete",
						"completed": true
					});
					notification({
						"type": "success",
						"title": "Success",
						"message": "Project has been marked as complete."
					});
					closeProject();
				}
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Project has not been marked as complete. Please try again."
				});
			}
		};
		const markAsIncomplete = () => {
			try {
				projects.updateDocument( projects.getDocument().value._id, {
					"status": "in progress",
					"completed": false
				});
				isIncompleteModalVisible.value = !isIncompleteModalVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Project has been reactivated."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Project has not been reactivated. Please try again."
				});
			}
		};
		const deleteProject = async () => {
			projects.deleteDocuments( projects.getDocument().value._id );
			closeProject();

			try {
				await contracts.readDocuments( "", { "project": projects.getDocument().value._id });
				const allContracts = contracts.getDocuments();
				const hasActive = ref( false );
				// eslint-disable-next-line max-depth
				for ( let i = 0; i < allContracts.length; i++ ) if ( allContracts[i].status !== "complete" ) hasActive.value = false;
				if ( hasActive.value === true ) {
					notification({
						"type": "error",
						"title": "Error",
						"message": "Project has not been deleted. There is still an active contract for this project. Please end the contract to delete this project."
					});
					isDeleteModalVisible.value = !isDeleteModalVisible.value;
				} else {
					projects.deleteDocuments( projects.getDocument().value._id );
					notification({
						"type": "success",
						"title": "Success",
						"message": "Project has been deleted."
					});
					closeProject();
				}
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Project has not been deleted. Please try again."
				});
			}
		};
		const postProject = async () => {
			const userType = profile.value.type;
			const response = await manualApi({
				"method": "get",
				"url": `payment/method/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`
			});
			if ( response.data?.data && response.data?.data.length > 0 ) router.push({ "name": "ProjectPost" });
			else {
				router.push({ "name": "BillingPlan" });
				notification({
					"type": "error",
					"title": "Error",
					"message": "Job posting cannot be created until a valid payment method is added to your account."
				});
			}
		};

		onMounted( () => projects.readDocuments( route.params.id ) );
		onUnmounted( () => projects.clearStore() );

		return {
			"document": projects.getDocument(),
			tabs,
			markAsComplete,
			closeProject,
			updateProject,
			deleteProject,
			postProject,
			profile,
			linkaccount,
			toggleCompleteModal,
			toggleIncompleteModal,
			toggleEditModal,
			toggleDeleteModal,
			isCompleteModalVisible,
			isIncompleteModalVisible,
			isEditModalVisible,
			isDeleteModalVisible,
			markAsIncomplete,
			projectForm
		};
	}
};
</script>
<style lang="stylus" scoped>
.show-calendar
	margin-bottom: 2em
.delete-container
	display: flex
	gap: 1.25em
	.description
		font-size: 0.875em
		.confirm
			padding-top: 0.625em
			font-weight: bold
</style>
