<template lang="pug">
div.grid-6.main-content
	card-container.col-4(title="Post Details")
		template(#controls)
			c-dropdown(title="Actions")
				c-button(title="Edit" type="transparent" @click="editJobPost()")
				c-button(title="Delete" type="transparent" @click="toggleDeleteModal()")
		template(#content)
			definition-list(:data="jobDetails")
	card-container.col-2(title="Applicants")
		template(#content)
			c-table(v-bind="{columns: columns, documents: applicants}" v-if="applicants && applicants.length > 0")
			div.no-applicants(v-else)
				icon(name="warning" size="huge")
				p No applicants
c-modal(title="Remove Project" v-model="isDeleteModalVisible")
	template(#content)
		icon.col-1(name="error" size="big")
		.text.col-5
			p You are deleting this job posting, which will remove it from the Job Board. All job posting details and any applicant data will be deleted too.
			b Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="deleteJobPost()")
</template>


<script>
import { ref, computed, inject, onMounted, onUnmounted } from "vue";
import cBanner from "~/components/Misc/cBanner.vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cModal from "~/components/Misc/cModal.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import { formatDate } from "~/core/utils.js";
import { industries, jurisdictions } from "~/data/static.js";
import { useRouter } from "vue-router";
import UseData from "~/store/Data.js";
export default {
	"components": {
		cBanner,
		definitionList,
		cModal,
		cAvatar,
		cDropdown
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
	// eslint-disable-next-line max-lines-per-function
	setup ( props ) {
		const jobs = new UseData( "jobs" );
		const projects = new UseData( "projects" );
		const proposals = new UseData( "proposals" );
		const users = new UseData( "users" );
		const router = useRouter();
		const isDeleteModalVisible = ref( false );
		const notification = inject( "notification" );
		const toggleDeleteModal = () => isDeleteModalVisible.value = !isDeleteModalVisible.value;
		const gotoProposal = id => {
			const findProposal = proposals.getDocuments().value.find( proposal => proposal._id === id );
			router.push({ "name": "ProposalView", "params": { "id": findProposal.job_id, "specialist_id": findProposal.owner_id } });
		};
		const deleteJobPost = async () => {
			try {
				await jobs.deleteDocuments( props.projectDetail.jobId );
				await projects.updateDocument( props.projectDetail._id, { "jobId": "" });
				notification({
					"type": "success",
					"title": "Success",
					"message": "Job posting has been deleted."
				});
				isDeleteModalVisible.value = !isDeleteModalVisible.value;
				props.reloadCollection();
				router.push({ "name": "ProjectDetail" });
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Job posting has not been deleted. Please try again."
				});
			}
		};
		const columns = [
			{
				"title": "Name",
				"key": "user",
				"cell": "CellUser"
			}, {
				"unsortable": true,
				"cell": "CellAction",
				"meta": { "title": "View", "action": gotoProposal, "icon": "search" }
			}
		];
		const jobDetails = computed( () => {
			const minExperience = {
				"1": "Junior",
				"2": "Intermediate",
				"3": "Expert"
			};
			const paymentType = {
				"upfront": "Upfront",
				"50/50": "50/50",
				"uponCompletion": "Upon Completion",
				"monthly": "Monthly",
				"biweekly": "Bi-Weekly"
			};
			const newJuristdictions = jobs.getDocument().value.jurisdictions?.map( jurisdiction => {
				const findjur = jurisdictions.find( jur => jur.value === jurisdiction );
				return findjur?.title;
			});
			const newIndustries = jobs.getDocument().value.industries?.map( industry => {
				const findind = industries.find( ind => ind.value === industry );
				return findind?.title;
			});
			const returnDetails = {
				"name": jobs.getDocument().value.name,
				"startsAt": formatDate( jobs.getDocument().value.startsAt ),
				"endsAt": formatDate( jobs.getDocument().value.endsAt ),
				"description": jobs.getDocument().value.description,
				"roleDetails": jobs.getDocument().value.roleDetails,
				"industries": newIndustries?.join( ",  " ),
				"jurisdictions": newJuristdictions?.join( ",  " ),
				"minExperience": minExperience[jobs.getDocument().value.minExperience],
				"formerRegulators": jobs.getDocument().value.formerRegulators ? "Yes" : "No",
				"skills": jobs.getDocument().value.skills?.join( ",  " ),
				"budget": `$${jobs.getDocument().value.budget}`,
				"hourlyRate": `$${jobs.getDocument().value.hourlyRate} ~ $${jobs.getDocument().value.maxHourlyRate}`,
				"paymentSchedule": paymentType[jobs.getDocument().value.paymentSchedule]
			};
			if ( jobs.getDocument().value.priceType === "fixed" ) delete returnDetails.hourlyRate;
			else delete returnDetails.budget;
			return returnDetails;
		});
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
		const editJobPost = () => router.push({ "name": "ProjectPostEdit", "params": { "id": props.projectDetail._id } });
		const applicants = computed( () => {
			const returnProposals = proposals.getDocuments().value.map( proposal => {
				const findUser = users.getDocuments().value.find( user => user._id === proposal.owner_id );
				const returnProposal = { ...proposal, "user": findUser };
				return returnProposal;
			});
			return returnProposals;
		});

		onMounted( () => {
			jobs.readDocuments( props.projectDetail.jobId );
			users.readDocuments();
			proposals.readDocuments( "", { "job_id": props.projectDetail.jobId });
		});
		onUnmounted( () => jobs.clearStore() );

		return {
			jobDetails,
			projectStatus,
			columns,
			collaborators,
			editJobPost,
			"document": jobs.getDocument(),
			toggleDeleteModal,
			isDeleteModalVisible,
			deleteJobPost,
			applicants
		};
	}
};
</script>
<style lang="stylus" scoped>
.no-applicants
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	padding-top: 2em
	p
		font-size: 1em
		color: var(--c-grey)

</style>
