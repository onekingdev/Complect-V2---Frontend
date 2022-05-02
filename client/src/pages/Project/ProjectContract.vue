<template lang="pug">
card-container(title="Contract Details")
	template(#controls)
		c-dropdown(title="Actions" wide)
			c-button(title="View Timesheet" type="transparent" @click="viewTimeSheet()")
			c-button(title="Edit Contract" type="transparent")
			c-button(title="End Contract" type="transparent" @click="toggleEndModal()")
			c-button(title="Edit Role" type="transparent" @click="toggleEditRoleModal()")
			c-button(title="Report Issue" type="transparent" @click="toggleReportModal()")
	template(#content)
		definition-list(:data="contract")
c-modal(title="Edit Role" v-model="isEditRoleModalVisible")
	template(#content)
		p Please confirm the role you whish assign the specialist
		div.border
			.cell-user
				c-avatar(:firstName="userData.firstName" :lastName="userData.lastName" :avatar="userData.avatar")
				.info
					.name {{ userData.firstName }} {{ userData.lastName }}
					c-rating(:max="5" v-model="userData.rating" :readonly="true")
			c-select(label="Select Role" placeholder="Select..." :data="roles" v-model="newRole")
			p.field-description Determintes the permissions to gran the specialist
	template(#footer)
		c-button(title="Submit" type="primary" @click="editRole()")
c-modal(title="End Contract" v-model="isEndModalVisible")
	template(#content)
		icon.col-1(name="warning" size="big")
		.text.col-5
			p Ending this contract will remove this specialist as a collaborator to the project, revoke their permissions to access your account and payout the remaining contract price.
			b Do you want to continue?
		div.border
			.cell-user.padding-inside
				c-avatar(:firstName="userData.firstName" :lastName="userData.lastName" :avatar="userData.avatar")
				.info
					.name {{ userData.firstName }} {{ userData.lastName }}
					.address {{ userData.city }} {{ userData.state }}
			hr
			.contract-detail.padding-inside
				.contract-detail-title Job Name
				.contract-detail-value Test Job
			.contract-detail.padding-inside
				.contract-detail-title Payment Schedule
				.contract-detail-value {{ contract.paymentSchedule }}
			.contract-detail.padding-inside
				.contract-detail-title Payment Method
				.contract-detail-value 1234
			hr
			.contract-description.field-description.padding-inside *This total does not refelct processing fees
	template(#footer)
		c-button(title="Confirm" type="primary" @click="endContract()")
c-modal(title="Report Issue" v-model="isReportModalVisible")
	template(#content)
		c-select(label="I want to" placeholder="Select..." :data="reportType" v-model="reportForm.type" :errors="errors.type" required)
		c-textarea(label="Details" placeholder="Details of your issue and desired resolution" v-model="reportForm.details"  :errors="errors.details" required)
		p.field-description Include anything you'd like us to know so we can best help you
	template(#footer)
		c-button(title="Submit" type="primary" @click="submitReport()")
</template>
<script>
import cBanner from "~/components/Misc/cBanner.vue";
import { ref, onMounted, inject, computed } from "vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cModal from "~/components/Misc/cModal.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import cRating from "~/components/Inputs/cRating.vue";
import UseData from "~/store/Data.js";
import { paymentType } from "~/data/static.js";
import { formatDate, validates } from "~/core/utils.js";
import useProfile from "~/store/Profile.js";
import { required } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";

const roles = [
	{
		"title": "None",
		"value": "none"
	}, {
		"title": "Basic",
		"value": "basic"
	}, {
		"title": "Trusted",
		"value": "trusted"
	}, {
		"title": "Admin",
		"value": "admin"
	}
];
const reportType = [
	{
		"title": "Halt payments",
		"value": "halt_payments"
	}, {
		"title": "Other",
		"value": "other"
	}
];
export default {
	"components": {
		cBanner,
		definitionList,
		cModal,
		cAvatar,
		cSelect,
		cDropdown,
		cRating
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
		const isEditRoleModalVisible = ref( false );
		const router = useRouter();
		const route = useRoute();
		const isReportModalVisible = ref( false );
		const isEndModalVisible = ref( false );
		const newRole = ref( "" );
		const { profile } = useProfile();
		const reportForm = ref({
			"type": "",
			"details": ""
		});
		const userData = ref([]);
		const errors = ref([]);
		const users = new UseData( "users" );
		const proposals = new UseData( "proposals" );
		const reports = new UseData( "reports" );
		const notification = inject( "notification" );
		const validateInfor = computed( () => ({
			"reportIssue": {
				"rules": {
					"type": { required },
					"details": { required }
				},
				"data": {
					"type": reportForm.value.type,
					"details": reportForm.value.details
				}
			}
		}) );
		const contract = computed( () => {
			const returnProposal = {
				"startsAt": "",
				"endsAt": "",
				"budget": "",
				"hourlyRate": "",
				"paymentSchedule": "",
				"roleDetails": "",
				"keyDeliverables": "",
				"document": ""
			};
			if ( proposals.getDocuments().value.length > 0 ) {
				returnProposal.startsAt = formatDate( proposals.getDocuments().value[0].startsAt );
				returnProposal.endsAt = formatDate( proposals.getDocuments().value[0].endsAt );
				returnProposal.budget = `$${proposals.getDocuments().value[0].budget}`;
				returnProposal.hourlyRate = `$${proposals.getDocuments().value[0].hourlyRate}`;
				returnProposal.paymentSchedule = paymentType[proposals.getDocuments().value[0].paymentSchedule];
				returnProposal.roleDetails = proposals.getDocuments().value[0].roleDetails;
				returnProposal.keyDeliverables = proposals.getDocuments().value[0].keyDeliverables;
				returnProposal.document = proposals.getDocuments().value[0].document;
				if ( proposals.getDocuments().value[0].priceType === "fixed" ) delete returnProposal.hourlyRate;
				else delete returnProposal.budget;
			}
			return returnProposal;
		});
		const viewTimeSheet = () => {
			router.push({ "name": "ProjectTimesheet", "params": { "id": route.params.id } });
		};
		const stepValidate = async currentStep => {
			const step = validateInfor.value[currentStep];
			errors.value = await validates( step.rules, step.data );
			return Object.keys( errors.value ).length === 0;
		};
		const toggleEditRoleModal = async () => {
			await users.readDocuments( proposals.getDocuments().value[0].owner_id );
			userData.value = users.getDocument().value;
			userData.value.rating = 5;
			isEditRoleModalVisible.value = !isEditRoleModalVisible.value;
		};
		const toggleReportModal = () => {
			isReportModalVisible.value = !isReportModalVisible.value;
			reportForm.value.type = "";
			reportForm.value.details = "";
		};
		const toggleEndModal = async () => {
			await users.readDocuments( proposals.getDocuments().value[0].owner_id );
			userData.value = users.getDocument().value;
			userData.value.rating = 5;
			isEndModalVisible.value = !isEndModalVisible.value;
		};
		const editRole = async () => {
			try {
				await users.updateDocument( userData.value._id, { "role": newRole.value });
				isEditRoleModalVisible.value = !isEditRoleModalVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Role has been updated"
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Role has not been updated. Please try again."
				});
			}
		};
		const submitReport = async () => {
			try {
				const isValidate = stepValidate( "reportIssue" );
				if ( isValidate ) {
					const reportDetail = { ...reportForm.value, "reporter": profile.value._id, "receiver": userData.value._id };
					await reports.createDocuments([reportDetail]);
					isReportModalVisible.value = !isReportModalVisible.value;
					notification({
						"type": "success",
						"title": "Success",
						"message": "Issue has been escalated for review"
					});
				}
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Issue has not been escalated for review. Please try again."
				});
			}
		};
		const endContract = async () => {
			try {
				await proposals.updateDocument( proposals.getDocuments().value[0]._id, { "status": "complete" });
				isEndModalVisible.value = !isEndModalVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Contract early completion request has been submitted."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Contract early completion request has not been submitted. Please try again."
				});
			}
		};
		onMounted( () => proposals.readDocuments( "", { "job_id": props.projectDetail.jobId, "status": "accepted" }) );
		return {
			submitReport,
			endContract,
			isEditRoleModalVisible,
			isReportModalVisible,
			isEndModalVisible,
			toggleEditRoleModal,
			toggleReportModal,
			toggleEndModal,
			editRole,
			userData,
			newRole,
			contract,
			roles,
			reportType,
			reportForm,
			errors,
			viewTimeSheet
		};
	}
};
</script>
<style lang="stylus" scoped>
.cell-user
	display: flex
	flex-direction: row
	margin-bottom: 1.5em
	.c-avatar
		margin-right: 1.5em
	.name
		padding-left: 0.7em
.border
	border: 1px solid var(--c-border);
	border-radius: 5px
.padding-inside
	padding: 1em
.field-description
	color: var(--c-grey-500)
	font-size: 12px
hr
	border: 1px solid var(--c-border)
.contract-detail
	font-size: 0.85em
	line-height: 1.3
	display: grid
	gap: 0.5em 2em
	grid-template-columns: max-content 1fr
	.contract-detail-title
		color: #797b7e
	.contract-detail-value
		text-align: right
.contract-description
	text-align: right
</style>
