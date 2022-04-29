<template lang="pug">
card-container(title="View Proposal")
	template(#content)
		.proposal-content.col-3
			.proposal-info-content.grid-6
				p.proposal-title Terms
				c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" disabled)
				c-field.col-3(label="Due Date" type="date" v-model="form.endsAt" disabled)
				c-field(v-if="job.priceType === 'fixed'" label="Bid Price" v-model="form.budget" disabled)
				c-field(v-else label="Hourly Rate" v-model="form.hourlyRate" disabled)
				c-select(v-if="job.priceType === 'fixed'" label="Payment Schedule" :data="fieldsOptions.fixedPaymentSchedule" v-model="form.paymentSchedule" disabled)
				c-select(v-else label="Payment Schedule" :data="fieldsOptions.hourlyPaymentSchedule" v-model="form.paymentSchedule" disabled)
			hr
			.proposal-info-content
				p.proposal-title Role
				c-textarea(label="Role Details" v-model="form.roleDetails" disabled)
				c-textarea(label="Key Deliverables" v-model="form.keyDeliverables" disabled)
			hr
			.proposal-info-content
				p.proposal-title Attachments
			.proposal-actions
				c-button.right-button(title="Accept" type="primary" @click="acceptProposal()")
				c-button.right-button(title="Reject" type="default" @click="rejectProposal()")
				c-button.right-button(title="Cancel" type="link" @click="gotoJobBoard()")
		.job-content.col-3
			.job-detail-content
				p.proposal-title TestTest
				.job-info-content.grid-6
					.col-1.job-info-title Start Date
					div.col-1
					.col-1.job-info-value {{ formatDate(job.startsAt) }}
				.job-info-content.grid-6
					.col-1.job-info-title End Date
					div.col-1
					.col-1.job-info-value {{ formatDate(job.endsAt) }}
				.job-info-content.grid-6
					.col-1.job-info-title Location
					div.col-1
					.col-1.job-info-value {{ locationType[job.locationType] }}
				.job-info-content.grid-6
					.col-1.job-info-title Industry
					div.col-1
					.col-1.job-info-value {{ job.industries?.map( ind => industriesMap[ind] ).join(',  ') }}
				.job-info-content.grid-6
					.col-1.job-info-title Min. Expereince
					div.col-1
					.col-1.job-info-value {{ minExperience[job.minExperience] }}
				.job-info-content.grid-6
					.col-1.job-info-title Description
					div.col-1
					.col-1.job-info-value {{ job.description }}
				.job-info-content.grid-6
					.col-1.job-info-title Role Details
					div.col-1
					.col-1.job-info-value {{ job.roleDetail }}
				div.grid-6.job-info
					div.col-2.job-info-ind
						icon(name="money" size="small")
						.detail
							label(v-if="job.priceType !== 'fixed'")
								span Hourly Rate
								p ${{ job.hourlyRate }} ~ ${{ job.maxHourlyRate }}
							label(v-else)
								span Fixed Budget
								p ${{ job.budget }}
					div.col-2.border-left.job-info-ind
						icon(name="money" size="small")
						.detail
							span PAYMENT SCHEDULE
							p {{ paymentType[job.paymentSchedule] }}
					div.col-2.border-left.job-info-ind
						icon(name="world" size="small")
						.detail
							span EXPEREINCE
							p {{ minExperience[job.minExperience] }}
			hr
			.skill-content
				p.skill-title Skills
				.skill-ind(v-for="skill in job.skills") {{ skill }}
			hr
			.client-content
				.client-info
					.client-name-content
						c-avatar(avatar="avatar.jpg" :firstName="specialist.first_name" :lastName="specialist.last_name" )
						div
							p.client-name(@click="toggleChatModal" ) {{ specialist.firstName }} {{ specialist.lastName }}
							p.client-location {{ specialist.city }}, {{ specialist.state }}, {{ specialist.country }}
					.client-details-content
						.client-detail-content.grid-6
							.col-1.client-info-title Industry
							div.col-1
							.col-1.client-info-value {{ specialist.industry }}
						.client-detail-content.grid-6
							.col-1.client-info-title Jurisdictions
							div.col-1
							.col-1.client-info-value {{ specialist.jurisdictions }}
						.client-detail-content.grid-6
							.col-1.client-info-title Expereince
							div.col-1
							.col-1.client-info-value {{ specialist.experience }}
						.client-detail-content.grid-6
							.col-1.client-info-title Description
							div.col-1
							.col-1.client-info-value {{ specialist.description }}
c-modal(:title="`Message with ${specialist.firstName} ${specialist.lastName}`" v-model="isChatVisible")
	template(#content)
		c-chat(:comments="comments")
</template>


<script>
import { ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatDate } from "~/core/utils.js";
import useProfile from "~/store/Profile.js";
import { industries, jurisdictions, minExperience, paymentType, locationType } from "~/data/static.js";
import UseData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cChat from "~/components/Misc/cChat.vue";
import cModal from "~/components/Misc/cModal.vue";
import cDropzone from "~/components/Inputs/cDropzone.vue";
const specialist = ref({
	"id": "3234234029384209384",
	"firstName": "Manuel",
	"lastName": "Perez",
	"city": "New York",
	"state": "NY",
	"industry": "Banking",
	"jurisdictions": "USA",
	"experience": "Senior",
	"description": "I am senior Developer"
});
export default {
	"components": { cSelect, cLabel, cBadge, cAvatar, cChat, cModal, cDropzone },
	// eslint-disable-next-line max-lines-per-function
	setup () {
		const jobs = new UseData( "jobs" );
		const proposals = new UseData( "proposals" );
		const { profile } = useProfile();
		const errors = ref({});
		const notification = inject( "notification" );
		const isChatVisible = ref( false );
		const router = useRouter();
		const route = useRoute();
		const form = ref({
			"startsAt": "",
			"endsAt": "",
			"hourlyRate": "",
			"budget": "",
			"priceType": "",
			"paymentSchedule": "",
			"roleDetails": "",
			"keyDeliverables": "",
			"document": "",
			"owner_id": profile.value._id,
			"job_id": route.params.id
		});

		const fieldsOptions = {
			"fixedPaymentSchedule": [
				{
					"title": "Upfront",
					"value": "upfront"
				}, {
					"title": "50/50",
					"value": "50"
				}, {
					"title": "Upon Completion",
					"value": "uponCompletion"
				}
			],
			"hourlyPaymentSchedule": [
				{
					"title": "Upon Completion",
					"value": "uponCompletion"
				}, {
					"title": "Monthly",
					"value": "monthly"
				}, {
					"title": "Bi-weekly",
					"value": "biweekly"
				}
			]
		};
		// eslint-disable-next-line no-sequences
		const juristdictionMap = jurisdictions.reduce( ( jur, cur ) => ( jur[cur.value] = cur.title, jur ), {});
		// eslint-disable-next-line no-sequences
		const industriesMap = industries.reduce( ( ind, cur ) => ( ind[cur.value] = cur.title, ind ), {});
		const toggleChatModal = () => isChatVisible.value = !isChatVisible.value;
		const gotoJobBoard = () => router.push({
			"name": "ProjectPost",
			"params": { "id": "61fb29f8d39177aad786604e" }
		});
		const rejectProposal = async () => {
			try {
				form.value.status = "rejected";
				await proposals.createDocuments([form.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "Proposal has been rejected"
				});
				gotoJobBoard();
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Proposal has not been rejected. Please try again."
				});
			}
		};
		const acceptProposal = async () => {
			try {
				form.value.status = "accepted";
				await proposals.createDocuments([form.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "Proposal has been accepted"
				});
				router.push({
					"name": "ProjectContract",
					"params": { "id": "61fb29f8d39177aad786604e" }
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Proposal has not been accepted. Please try again."
				});
			}
		};
		onMounted( async () => {
			await jobs.readDocuments( route.params.id );
			await proposals.readDocuments( "", { "job_id": route.params.id, "owner_id": route.params.specialist_id });
			if ( !proposals.getDocuments().value || proposals.getDocuments().value.length === 0 ) {
				form.value.startsAt = jobs.getDocument().value.startsAt;
				form.value.endsAt = jobs.getDocument().value.endsAt;
				form.value.priceType = jobs.getDocument().value.priceType;
			} else form.value = proposals.getDocuments().value[0];
		});
		return {
			"job": jobs.getDocument(),
			"proposals": proposals.getDocuments(),
			specialist,
			formatDate,
			toggleChatModal,
			isChatVisible,
			fieldsOptions,
			form,
			locationType,
			paymentType,
			minExperience,
			juristdictionMap,
			industriesMap,
			gotoJobBoard,
			rejectProposal,
			acceptProposal,
			errors
		};
	}
};
</script>
<style lang="stylus" scoped>
.card-container
	width: 90%;
	margin: auto;
	margin-top: 2em
	background: white
	.proposal-title
		font-size: 1.25em
		margin-bottom: 1em
	hr
		border: 1px solid var(--c-border)
	.proposal-content
		.proposal-info-content
			margin-top: 1.25em
			margin-bottom: 1.25em;
		.proposal-actions
			display: flex
			flex-direction: row-reverse
			gap: 1em
	.job-content
		border: 1px solid var(--c-border)
		border-radius: 5px
		.job-detail-content
			padding: 1.25em 3em
			.job-info-content
				.job-info-title
					color: var(--c-grey)
					font-size: 0.875em
				.job-info-value
					color: var(--c-headers)
					font-size: 1em
			.job-info
				margin-top: 2em
				.border-left
					border-left: 1px solid var(--c-border)
					padding-left: 1.25em
				.job-info-ind
					svg
						margin-top: 0.375em
					display: flex
					flex-direction: row
					gap: 1em
					.detail
						font-weight: 700
					span
						color: var(--c-grey-500)
						font-weight: 500
		.skill-content
			padding: 2em 3em
			.skill-title
				font-size: 1.25em
				font-weight: 700
				margin-bottom: 1.25em
			.skill-ind
				border: 1px solid var(--c-border)
				border-radius: 5px
				display: inline-block
				padding: 0.125em 0.3em
				margin-right: 0.7em
				font-size: 0.875em
		.client-content
			padding: 2em 3em
			.client-title
				font-size: 1.25em
				font-weight: 700
			.client-info
				margin-top: 1rem
				border: 1px solid var(--c-border)
				border-radius: 5px
				.client-name-content
					display: flex
					gap: 2em
					border-bottom: 1px solid var(--c-border)
					padding: 2rem;
					.client-name
						color: var(--c-selected);
					.client-location
						color: var(--c-grey-500)
				.client-details-content
					padding: 2rem;
					.client-info-title
						color: var(--c-grey)
						font-size: 0.875em
</style>

