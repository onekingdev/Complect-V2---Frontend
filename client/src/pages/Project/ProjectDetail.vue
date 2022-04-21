<template lang="pug">
c-banner( v-if="projectStatus === 'draft'" type="info" title="Your job posting is currently in draft" message="Finish the posting to submit it to our job board.")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="projectDetail > Date.now() - 86400000 && projectDetail < Date.now()" type="info" title="Your project will be ended within 24 hours" message="Finish the posting to submit it to our job board.")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="projectStatus === 'pending'" type="info" title="Your job posting is currently in live" message="Your job posting is currently in live")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="Your job has applicants" message="Your job has applicants")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="Your job starts in 24 hours and no one hired" message="Your job starts in 24 hours and no one hired")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="Your contract will be ended within 24 hours" message="Your contract will be ended within 24 hours")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="You received contract modification request" message="You received contract modification request")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="Your contract modification request approved" message="Your contract modification request approved")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
c-banner( v-if="false" type="info" title="Your contract modification request rejected" message="Your contract modification request rejected")
	template(#controls)
		c-button(title="View")
		c-button(type="icon" iconL="close" size="small")
div.grid-6.main-content
	card-container.col-4(title="Project Details")
		template(#controls)
			c-button(title="Edit" type="primary" @click="toggleEditModal()")
		template(#content)
			definition-list(:data="projectDetails")
	card-container.col-2(title="Collaborators")
		template(#controls)
			c-button(title="View All" type="link" @click="collaboratorTab()")
		template(#content)
			c-table(v-bind="{columns: adminColumns, documents: collaborators}")
	card-container(title="Discussion")
		template(#content)
			.empty-content(v-if="!projectDetail.comments")
				icon(name="empty-state" size="huge")
				p No comments posted {{ projectDetail }}
			.has-content(v-else)
				.ind-comment(v-for="comment in projectDetail.comments")
					c-avatar(:firstName="comment.creator.first_name" :lastName="comment.creator.last_name" :avatar="comment.creator.avatar")
					.user-info
						.name {{ comment.creator.firstName }} {{ comment.creator.lastName }} commented
						.description {{ comment.description }}
					.comment-date {{ formatDate( comment.createdAt ) }}
			.input-comment
				c-textarea(label="Comment" v-model="newcomment" placeholder="Mkae a comment or leave a note...")
				c-button.comment-send(title="Send" type="primary" @click="addNewComment()")
c-modal(title="Edit Project" v-model="isEditModalVisible")
	template(#content)
		c-field(label="Project Name" v-model="projectForm.name" required)
		c-field.col-3(label="Start Date" type="date" v-model="projectForm.startsAt" required)
		c-field.col-3(label="End Date" type="date" v-model="projectForm.endsAt" required)
		c-field(label="Description" v-model="projectForm.description")
	template(#footer)
		c-button(title="Save" type="primary" @click="updateProjectDetail()")
c-modal(title="Remove Collaborator" v-model="isRemoveColModalVisible")
	template(#content)
		icon.col-1(name="error" size="big")
		.text.col-5
			p You are removing this user as a collaborator from the project. Except for any linked tasks specifically assigned to them, this user will no longer be able to view this project and its contents.
	template(#footer)
		c-button(title="Confirm" type="primary" @click="deleteCol()")
</template>


<script>
import { computed, ref, inject } from "vue";
import cBanner from "~/components/Misc/cBanner.vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cModal from "~/components/Misc/cModal.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import { formatDate } from "~/core/utils.js";
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import UseData from "~/store/Data.js";
export default {
	"components": {
		cBanner,
		definitionList,
		cModal,
		cAvatar
	},
	"props": {
		"projectDetail": {
			"type": Object,
			"required": true,
			"default": {}
		},
		"reloadCollection": {
			"type": Function,
			"default": () => 1
		}
	},
	"emits": ["update:projectDetail"],
	// eslint-disable-next-line
	setup ( props ) {
		const projects = new UseData( "projects" );
		const notification = inject( "notification" );
		const router = useRouter();
		const { profile } = useProfile();
		const isEditModalVisible = ref( false );
		const isRemoveColModalVisible = ref( false );
		const newcomment = ref( "" );
		const clickedId = ref( "" );
		const projectForm = ref({
			"name": "",
			"startsAt": "",
			"endsAt": "",
			"description": ""
		});
		const toggleEditModal = () => {
			isEditModalVisible.value = !isEditModalVisible.value;
			projectForm.value.name = props.projectDetail.name;
			projectForm.value.startsAt = props.projectDetail.startsAt;
			projectForm.value.endsAt = props.projectDetail.endsAt;
			projectForm.value.description = props.projectDetail.description;
		};
		const projectDetails = computed( () => ({
			"name": props.projectDetail?.name,
			"startsAt": formatDate( props.projectDetail?.startsAt ),
			"endsAt": formatDate( props.projectDetail?.endsAt ),
			"description": props.projectDetail?.description
		}) );

		const handleClickRemoveCol = id => {
			isRemoveColModalVisible.value = !isRemoveColModalVisible.value;
			clickedId.value = id;
		};
		const handleViewTimeSheet = () => {

		};
		const deleteCol = async () => {
			try {
				const allCollaborator = props.projectDetail.collaborators.filter( collaborator => collaborator._id !== clickedId.value );
				await projects.updateDocument( props.projectDetail._id, { "collaborators": allCollaborator });
				props.reloadCollection();
				isRemoveColModalVisible.value = !isRemoveColModalVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "User has been removed from the project."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "User has been not removed from the project. Please try again."
				});
			}
		};
		const addNewComment = () => {
			const commentData = props.projectDetail.comments || [];
			commentData.push({
				"description": newcomment.value,
				"creator": {
					"firstName": profile.value.firstName,
					"lastName": profile.value.lastName,
					"avatar": profile.value.avatar
				},
				"createdAt": Date.now()
			});
			projects.updateDocument( props.projectDetail._id, { "comments": commentData });
			newcomment.value = "";
			props.reloadCollection();
		};

		const columns = [{
			"title": "Name",
			"key": "user",
			"cell": "CellUser"
		}];
		const adminColumns = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			}, {
				"unsortable": true,
				"cell": "CellDropdown",
				"meta": {
					"actions": [
						{ "title": "Remove", "action": handleClickRemoveCol }, { "title": "View Timesheet", "action": handleViewTimeSheet }
					]
				}
			}
		];
		const collaborators = computed( () => {
			const returnValue = [];
			if ( !props.projectDetail?.collaborators ) return returnValue;
			for ( let i = 0; i < props.projectDetail?.collaborators?.length && i < 5; i++ ) {
				const userinfo = props.projectDetail?.collaborators[i];
				userinfo.info = userinfo.role;
				if ( userinfo._id === props.projectDetail.creator && props.projectDetail.creator ) userinfo.info += "& Project Creator";
				returnValue.push({ "user": props.projectDetail?.collaborators[i] });
			}
			return returnValue;
		});
		const projectStatus = computed( () => props.projectDetail?.status );
		const updateProjectDetail = async () => {
			isEditModalVisible.value = !isEditModalVisible.value;
			await projects.updateDocument( props.projectDetail._id, projectForm.value );
			props.reloadCollection();
		};
		const collaboratorTab = () => router.push({ "name": "ProjectCollaborators" });

		return {
			projectDetails,
			projectStatus,
			toggleEditModal,
			isEditModalVisible,
			isRemoveColModalVisible,
			projectForm,
			updateProjectDetail,
			columns,
			adminColumns,
			collaborators,
			collaboratorTab,
			deleteCol,
			newcomment,
			addNewComment,
			formatDate
		};
	}
};
</script>
<style lang="stylus" scoped>
.main-content
	margin-top: 1em
	.empty-content
		min-height: 20em
		display: flex
		justify-content: center
		align-items: center
		p
			color: var(--c-grey)
	.has-content
		min-height: 20em
		.ind-comment
			display: flex
			padding-bottom: 0.7em
			border-bottom: 1px solid var(--c-border)
			.c-avatar
				margin-right: 0.5em
			.comment-date
				margin-left: auto;
				color: var(--c-grey)
	.input-comment
		.comment-send
			float: right
			margin-top: 0.7em
</style>
