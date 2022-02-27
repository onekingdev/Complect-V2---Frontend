<template lang="pug">
market-container
	template(#filter title="Filters")
		card-container
			template(#content)
				h3 Filters
				.filter-content.border-bottom
					.filter-title-content(@click="toggleShowStatus('jobtype')")
						.filter-title JOB TYPE
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['jobtype']")
							icon(name="chevron-down" size="small" v-if="!filterShow['jobtype']")
					.filter-values(v-if="filterShow['jobtype']")
						c-checkbox.filter-value(label="Fixed" v-model="filterValues['jobtype']" value="Fixed" multiple)
						c-checkbox.filter-value(label="Hourly" v-model="filterValues['jobtype']" value="Hourly" multiple)
				.filter-content.border-bottom
					.filter-title-content(@click="toggleShowStatus('level')")
						.filter-title EXPEREINCE LEVEL
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['level']")
							icon(name="chevron-down" size="small" v-if="!filterShow['level']")
					.filter-values(v-if="filterShow['level']")
						c-checkbox.filter-value(label="Junior" v-model="filterValues['level']" value="Junior" multiple)
						c-checkbox.filter-value(label="Intermediate" v-model="filterValues['level']" value="Intermediate" multiple)
						c-checkbox.filter-value(label="Expert" v-model="filterValues['level']" value="Expert" multiple)
				.filter-content
					.filter-title-content(@click="toggleShowStatus('duration')")
						.filter-title ESTIMATED DURATION
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['duration']")
							icon(name="chevron-down" size="small" v-if="!filterShow['duration']")
					.filter-values(v-if="filterShow['duration']")
						c-checkbox.filter-value(label="Less than 1 month" v-model="filterValues['duration']" value="Less than 1 month" multiple)
						c-checkbox.filter-value(label="1 to 3 months" v-model="filterValues['duration']" value="1 to 3 months" multiple)
						c-checkbox.filter-value(label="3 to 6 months" v-model="filterValues['duration']" value="3 to 6 months" multiple)
						c-checkbox.filter-value(label="More than 6 months" v-model="filterValues['duration']" value="More than 6 months" multiple)
	template(#content)
		card-container(title="Browse Jobs")
			template(#content)
				.search-bar.grid-6
					c-field.col-5(label="Search" v-model="searchValue" placeholder="Enter job type, keywords, etc.")
					c-select.col-1(label="Sort By" :data="sortOptions" v-model="sortValue")
				.job-content(v-for="(job, index) in jobs")
					router-link(:to="{name: 'JobBoardDetail', params: {id: job.id}}") {{ job.name }}
					p.job-type {{ job.locationType }} | {{ job.industries }} | Start {{ formatDate(job.startAt) }}
					p.job-description {{ job.description }}
					div.grid-6.job-info
						div.col-3.grid-6
							div.col-3.job-info-ind
								icon(name="money" size="small")
								.detail
									label(v-if="job.priceType == 'Hourly'")
										span Hourly Rate
										p ${{ job.budget[0] }} ~ ${{ job.budget[1] }}
									label(v-else)
										span Fixed Budget
										p ${{ job.budget[0] }}
							div.col-3.border-left.job-info-ind
								icon(name="money" size="small")
								.detail
									span PAYMENT SCHEDULE
									p {{ job.payment }}
						div.col-3.grid-6
							div.col-3.border-left.job-info-ind
								icon(name="world" size="small")
								.detail
									span EXPEREINCE
									p {{ job.level }}
							div.col-3
								c-button(title="View Details" @click="showDetail()")
					hr(v-if="index != jobs.length - 1")
router-view
</template>


<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import MarketContainer from "~/components/Containers/MarketContainer.vue";
import { formatDate } from "~/core/utils.js";
// import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cSelect, cLabel, cBadge, MarketContainer },
	// eslint-disable-next-line max-lines-per-function
	setup () {
		// const notification = inject( "notification" );
		const router = useRouter();
		// const { createDocuments } = useData( "risks" );

		const sortOptions = [
			{ "title": "Newest", "value": "newest" }, { "title": "Price", "value": "price" }, { "title": "Duration", "value": "duration" }
		];
		const sortValue = ref();
		const searchValue = ref();
		const filterValues = ref({
			"level": [],
			"jobtype": [],
			"duration": []
		});

		const filterShow = ref({
			"jobtype": true,
			"level": true,
			"duration": true
		});

		const showDetail = () => {
			router.push({
				"name": "JobBoardDetail",
				"params": { "id": "234234234234234" }
			});
		};
		const toggleShowStatus = id => filterShow.value[id] = !filterShow.value[id];
		const documents = ref([
			{
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
				"payment": "Upon Complete",
				"duration": "Less than 1 month"
			}, {
				"id": "50996830495830495",
				"name": "Test2",
				"startAt": 1643936623499,
				"endsAt": 1643936623499,
				"description": "This is second test project",
				"details": "",
				"locationType": "Remote",
				"location": "USA",
				"jurisdictions": "USA",
				"industries": "Fintech",
				"level": "Junior",
				"skills": [
					"HTML", "CSS", "Javascript"
				],
				"priceType": "Fixed",
				"minExperience": 4,
				"regulator": true,
				"budget": ["500"],
				"payment": "50/50",
				"duration": "1 to 3 months"
			}
		]);
		const jobs = computed( () => {
			let alljobs;
			alljobs = documents.value;
			if ( searchValue.value ) alljobs = alljobs.filter( job => job.name.indexOf( searchValue.value ) > -1 );
			if ( filterValues.value.jobtype.length > 0 ) alljobs = alljobs.filter( job => filterValues.value.jobtype.indexOf( job.priceType ) > -1 );
			if ( filterValues.value.level.length > 0 ) alljobs = alljobs.filter( job => filterValues.value.level.indexOf( job.level ) > -1 );
			if ( filterValues.value.duration.length > 0 ) alljobs = alljobs.filter( job => filterValues.value.duration.indexOf( job.duration ) > -1 );

			const durationMapping = {
				"Less than 1 month": 0,
				"1 to 3 months": 1,
				"3 to 6 months": 2,
				"More than 6 months": 3
			};

			if ( sortValue.value === "price" ) alljobs.sort( ( job1, job2 ) => job2.budget[0] - job1.budget[0]);
			else if ( sortValue.value === "newest" ) alljobs.sort( ( job1, job2 ) => job2.startAt - job1.startAt );
			else if ( sortValue.value === "duration" ) alljobs.sort( ( job1, job2 ) => durationMapping[job2.duration] - durationMapping[job1.duration]);

			return alljobs;
		});
		return {
			sortOptions,
			showDetail,
			filterShow,
			toggleShowStatus,
			jobs,
			formatDate,
			sortValue,
			filterValues,
			searchValue
		};
	}
};
</script>
<style lang="stylus" scoped>
.filter-content
	&.border-bottom
		border-bottom: 1px solid var(--c-border)
		padding-bottom: 1.25em
	.filter-title-content
		cursor: pointer
		.filter-title
			display: inline-block
		.filter-icon
			float: right
	.filter-value
		margin-top: 0.7em
.job-content
	padding: 2em 3em
	hr
		margin: 0 -4.5em
		margin-top: 1.25em
	.job-title
		font-weight: 900
	.job-type
		color: var(--c-grey-500)
	.job-description
		margin-top: 1.25em
		margin-bottom: 2em
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
</style>

