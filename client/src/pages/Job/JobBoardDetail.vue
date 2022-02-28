<template lang="pug">
.job-detail
	.controls
		c-button(iconL="chevron-left" title="Close" @click="closeDetail()")
		c-button.right-button(title="Apply" type="primary")
	.content
		.job-detail-content
			p.job-board-title Project Details
			p.job-title TestTest
			.job-info-content.grid-6
				.col-1.job-info-title Location
				div.col-1
				.col-1.job-info-value {{ job.locationType }}
			.job-info-content.grid-6
				.col-1.job-info-title Industry
				div.col-1
				.col-1.job-info-value {{ job.industries }}
			.job-info-content.grid-6
				.col-1.job-info-title Start Date
				div.col-1
				.col-1.job-info-value {{ formatDate(job.startAt) }}
			.job-info-content.grid-6
				.col-1.job-info-title End Date
				div.col-1
				.col-1.job-info-value {{ formatDate(job.endsAt) }}
			.job-info-content.grid-6
				.col-1.job-info-title Min. Expereince
				div.col-1
				.col-1.job-info-value {{ job.level }}
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
						label(v-if="job.priceType == 'Hourly'")
							span Hourly Rate
							p ${{ job.budget[0] }} ~ ${{ job.budget[1] }}
						label(v-else)
							span Fixed Budget
							p ${{ job.budget[0] }}
				div.col-2.border-left.job-info-ind
					icon(name="money" size="small")
					.detail
						span PAYMENT SCHEDULE
						p {{ job.payment }}
				div.col-2.border-left.job-info-ind
					icon(name="world" size="small")
					.detail
						span EXPEREINCE
						p {{ job.level }}
		hr
		.skill-content
			p.skill-title Skills
			.skill-ind(v-for="skill in job.skills") {{ skill }}
		hr
		.client-content
			p.client-title Client Details
			.client-info
				.client-name-content
					c-avatar(avatar="avatar.jpg" :firstName="business.firstName" :lastName="business.lastName" )
					div
						p.client-name(@click="toggleChatModal" ) {{ business.firstName }} {{ business.lastName }}
						p.client-location {{ business.city }}, {{ business.state }}, {{ business.country }}
				.client-details-content
					.client-detail-content.grid-6
						.col-1.client-info-title Industry
						div.col-1
						.col-1.client-info-value {{ business.industry }}
					.client-detail-content.grid-6
						.col-1.client-info-title Jurisdictions
						div.col-1
						.col-1.client-info-value {{ business.jurisdictions }}
					.client-detail-content.grid-6
						.col-1.client-info-title AUM
						div.col-1
						.col-1.client-info-value {{ business.AUM }}
					.client-detail-content.grid-6
						.col-1.client-info-title Accouonts
						div.col-1
						.col-1.client-info-value {{ business.accounts }}
					.client-detail-content.grid-6
						.col-1.client-info-title Employees
						div.col-1
						.col-1.client-info-value {{ business.employee }}
c-modal(:title="`Message with ${business.firstName} ${business.lastName}`" v-model="isChatVisible")
	template(#content)
		c-chat(:comments="comments")
.overflow-content(@click="closeDetail()")
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { formatDate } from "~/core/utils.js";
// import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cChat from "~/components/Misc/cChat.vue";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cSelect, cLabel, cBadge, cAvatar, cChat, cModal },
	setup () {
		const job = ref({
			"id": "234982734982734",
			"name": "Test1",
			"startAt": 1643994498410,
			"endsAt": 1643994498410,
			"description": "This is first test project",
			"details": "",
			"locationType": "Remote",
			"location": "USA",
			"jurisdictions": "USA",
			"industries": "Bank",
			"skills": [
				"HTML", "CSS", "Javascript"
			],
			"level": "Intermediate",
			"minExperience": 4,
			"regulator": true,
			"priceType": "Hourly",
			"budget": [
				"30", "50"
			],
			"roleDetail": "Test",
			"payment": "Upon Complete",
			"duration": "Less than 1 month"
		});
		const business = ref({
			"id": "3234234029384209384",
			"firstName": "Manuel",
			"lastName": "Perez",
			"city": "New York",
			"state": "NY",
			"industry": "Banking",
			"jurisdictions": "USA",
			"AUM": "234234234",
			"accounts": 10,
			"employee": 2,
			"country": "United State"
		});
		const isChatVisible = ref( false );
		const router = useRouter();
		const toggleChatModal = () => isChatVisible.value = !isChatVisible.value;


		const closeDetail = () => router.push({ "name": "JobBoard" });

		return {
			job,
			business,
			closeDetail,
			formatDate,
			toggleChatModal,
			isChatVisible
		};
	}
};
</script>
<style lang="stylus" scoped>
.job-detail
	border-left: 1px solid var(--c-border)
	left: auto
	right: 0
	display: flex
	flex-direction: column
	position: absolute
	top: 0
	max-width: 100%
	min-height: 100vh
	margin: 0
	outline: 0
	transform: translateX(0)
	background: white
	z-index: 4
	.controls
		padding: 2em 3em 0 2em
		display: flex
		flex-direction: row
		.right-button
			margin-left: auto
	.content
		hr
			border: 1px solid var(--c-border)
		.job-detail-content
			padding: 1.25em 3em
			.job-board-title
				font-weight: 700
				font-size: 1.25em
			.job-title
				font-size: 1.25em
				margin-bottom: 1em
			.job-info-content
				font-size: 14px
				.job-info-title
					color: var(--c-grey-500)
					font-size: 14px
				.job-info-value
					color: var(--c-headers)
					font-size: 16px
			.job-info
				margin-top: 2em
				.border-left
					border-left: 1px solid var(--c-border)
					padding-left: 1.25em
				.job-info-ind
					svg
						margin-top: 6px
					display: flex
					flex-direction: row
					gaps: 1em
					font-weight: 700
					.detail
						margin-left: 0.7em
					span
						color: var(--c-grey-500)
						font-weight: 500
		.skill-content
			padding: 2em 3em
			.skill-title
				font-size: 20px
				font-weight: 700
				margin-bottom: 1.25em
			.skill-ind
				border: 1px solid var(--c-border)
				border-radius: 5px
				display: inline-block
				padding: 0.125em 0.3em
				margin-right: 0.7em
				font-size: 14px
		.client-content
			padding: 2em 3em
			.client-title
				font-size: 20px
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
.overflow-content
	background: var(--c-bg-f0);
	opacity: .6
	position: fixed
	top: 0
	left: 0
	right: 0
	bottom: 0
</style>

