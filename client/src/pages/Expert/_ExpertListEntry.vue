<template lang="pug">
market-container
	template(#filter title="Filters")
		card-container
			template(#content)
				h3 Filters
				.filter-content.border-bottom
					.filter-title-content(@click="toggleShowStatus('industry')")
						.filter-title INDUSTRY
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['industry']")
							icon(name="chevron-down" size="small" v-if="!filterShow['industry']")
					.filter-values(v-if="filterShow['industry']")
						c-select.filter-value(label="" placeholder="Select Industry" :data="industries" v-model="filterValues['industry']" searchable multiple)
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
					.filter-title-content(@click="toggleShowStatus('rate')")
						.filter-title Hourly Rate
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['rate']")
							icon(name="chevron-down" size="small" v-if="!filterShow['rate']")
					.filter-values(v-if="filterShow['rate']")
						slider.filter-value.slider-primary(v-model="filterValues['rate']" :max="maxValue")
				.filter-content
					.filter-title-content(@click="toggleShowStatus('jurisdiction')")
						.filter-title JURISDICTION
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['jurisdiction']")
							icon(name="chevron-down" size="small" v-if="!filterShow['jurisdiction']")
					.filter-values(v-if="filterShow['jurisdiction']")
						c-select.filter-value(label="" placeholder="Select country/region" :data="jurisdictions" v-model="filterValues['jurisdiction']" searchable multiple)
				.filter-content
					.filter-title-content(@click="toggleShowStatus('regulator')")
						.filter-title FORMER REGULATOR
						.filter-icon
							icon(name="chevron-up" size="small" v-if="filterShow['regulator']")
							icon(name="chevron-down" size="small" v-if="!filterShow['regulator']")
					.filter-values(v-if="filterShow['regulator']")
						c-radios.filter-value(id="regulator" :data="radioOptions" v-model="filterValues['regulator']")
	template(#content)
		card-container(title="Browse Specialists")
			template(#content)
				.search-bar.grid-6
					c-field.col-5(label="Search" placeholder="Enter keyworkds, skills, etc." v-model="searchValue")
					c-select.col-1(label="Sort By" :data="sortOptions" v-model="sortValue")
				.user-content.grid-6(v-for="(user, index) in users")
					.col-1
						c-avatar(avatar="avatar.jpg" :firstName="user.firstName" :lastName="user.lastName" size="huge")
					.col-5
						.user-detail
							div
								router-link.user-title(:to="{name: 'ExpertDetail', params: {id: user._id}}") {{ user.firstName }} {{ user.lastName }}
								p.user-type
									span.user-indsutry(v-for="industry in user.industries") {{ industries.find( ind => ind.value == industry )["title"] }}
							c-button-modal.message-button( :modalTitle="`Message with ${user.firstName} ${user.lastName}`" type="primary" title="Message")
								template(#content)
									c-chat(:comments="comments")
						c-rating(readonly v-model="rating")
						.skill-content
							.skill-ind(v-for="skill in user.skills") {{ skill }}
						div.grid-6.user-info
							div.col-2.user-info-ind
								icon(name="money" size="small")
								.detail
									span Hourly Rate
									p ${{ user.rate }}
							div.col-2.border-left.user-info-ind
								icon(name="money" size="small")
								.detail
									span Experience
									p(v-if="user.experience == 0") Junior
									p(v-if="user.experience == 1") Intermediate
									p(v-if="user.experience == 2") Expert
							div.col-2.border-left.user-info-ind
								icon(name="world" size="small")
								.detail
									span JURISDICTION
									p
										span.user-jurisdiction(v-for="jurisdiction in user.jurisdictions") {{ jurisdictions.find( jur => jur.value == jurisdiction )["title"] }}
					hr(v-if="index != users.length - 1")
</template>


<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import MarketContainer from "~/components/Containers/MarketContainer.vue";
// import { calcRiskLevel } from "~/core/utils.js";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cChat from "~/components/Misc/cChat.vue";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cRange from "~/components/Inputs/cRange.vue";
import cRating from "~/components/Inputs/cRating.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
import { industries, jurisdictions } from "~/data/static.js";
import Slider from "@vueform/slider";
export default {
	"components": { cSelect, cLabel, cBadge, MarketContainer, cRange, cRating, cAvatar, cChat, Slider, cRadios },
	setup () {
		// const notification = inject( "notification" );
		const router = useRouter();
		const { readDocuments, clearStore, documents } = useData( "users" );
		const rating = ref( 0 );

		const searchValue = ref();
		const sortValue = ref();
		const maxValue = ref( 500 );
		const filterShow = ref({
			"industry": true,
			"level": true,
			"rate": true,
			"jurisdiction": true,
			"regulator": true
		});
		const sortOptions = [
			{ "title": "Newest", "value": "newest" }, { "title": "Rating", "value": "rating" }, { "title": "Hourly rate", "value": "hourly" }
		];
		const radioOptions = [
			{ "title": "No", "value": false }, { "title": "Yes", "value": true }
		];

		const filterValues = ref({
			"industry": [],
			"level": [],
			"rate": [
				0, maxValue.value
			],
			"jurisdiction": [],
			"regulator": ""
		});

		const showDetail = () => {
			router.push({
				"name": "JobBoardDetail",
				"params": { "id": "234234234234234" }
			});
		};
		const toggleShowStatus = id => filterShow.value[id] = !filterShow.value[id];
		const users = computed( () => {
			let allusers;
			allusers = documents.value;
			allusers = allusers.filter( user => user.type === "specialist" && user.jurisdictions?.length > 0 );
			const levelmapping = {
				"Junior": 0,
				"Intermediate": 1,
				"Expert": 2
			};
			if ( searchValue.value ) allusers = allusers.filter( user => user.firstName.indexOf( searchValue.value ) > -1 || user.lastName.indexOf( searchValue.value ) > -1 );
			if ( filterValues.value.industry.length > 0 ) {
				allusers = allusers.filter( user => {
					let isInclude;
					isInclude = false;
					for ( let i = 0; i < user.industries.length; i++ ) if ( filterValues.value.industry.indexOf( user.industries[i]) > -1 ) isInclude = true;
					return isInclude;
				});
			}
			if ( filterValues.value.level.length > 0 ) allusers = allusers.filter( user => filterValues.value.level.indexOf( levelmapping[user.level]) > -1 );
			if ( filterValues.value.rate.length > 0 ) allusers = allusers.filter( user => filterValues.value.rate[0] <= user.rate && filterValues.value.rate[1] >= user.rate );
			if ( filterValues.value.jurisdiction.length > 0 ) {
				allusers = allusers.filter( user => {
					let isInclude;
					isInclude = false;
					for ( let i = 0; i < user.jurisdictions.length; i++ ) if ( filterValues.value.jurisdiction.indexOf( user.jurisdictions[i]) > -1 ) isInclude = true;
					return isInclude;
				});
			}
			if ( filterValues.value.regulator === true ) allusers = allusers.filter( user => user === true );
			if ( filterValues.value.regulator !== true ) allusers = allusers.filter( user => user !== true );

			if ( sortValue.value === "hourly" ) allusers.sort( ( user1, user2 ) => user1.rate - user2.rate );
			// else if ( sortValue.value === "newest" ) alljobs.sort( ( job1, job2 ) => job2.startAt - job1.startAt );
			// else if ( sortValue.value === "duration" ) alljobs.sort( ( job1, job2 ) => durationMapping[job2.duration] - durationMapping[job1.duration]);

			return allusers;
		});
		const isChatVisible = ref( false );
		const toggleChatModal = () => isChatVisible.value = !isChatVisible.value;

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );

		return {
			showDetail,
			filterShow,
			toggleShowStatus,
			industries,
			jurisdictions,
			filterValues,
			users,
			documents,
			searchValue,
			rating,
			toggleChatModal,
			isChatVisible,
			sortOptions,
			sortValue,
			maxValue,
			radioOptions
		};
	}
};
</script>
<style lang="stylus" scoped>
.filter-content
	paading-top: 10px
	&.border-bottom
		border-bottom: 1px solid #ddd
		padding-bottom: 20px
	.filter-title-content
		cursor: pointer
		.filter-title
			display: inline-block
		.filter-icon
			float: right
	.filter-value
		margin-top: 10px
		font-size: 14px
	.slider-primary
		margin-top: 30px
		--slider-connect-bg: #2e304f;
		--slider-tooltip-bg: #2e304f;
		--slider-handle-ring-color: #2e304f;
.user-content
	padding: 2em 3em
	margin: 0px -1.5em
	.user-detail
		display: flex
		.user-title
			font-weight: 900
		.user-type
			color: #888
			.user-indsutry
				font-size: 14px
				margin-right: 10px
		.message-button
			margin-left: auto
	.user-description
		margin-top: 20px
		margin-bottom: 30px
	.skill-content
		.skill-ind
				border: 1px solid #ddd
				border-radius: 5px
				display: inline-block
				padding: 2px 5px
				margin-right: 10px
				font-size: 14px
	.user-info
		margin-top: 30px
		.border-left
			border-left: 1px solid #ddd
			padding-left: 20px
		.user-info-ind
			display: flex
			flex-direction: row
			gaps: 1em
			font-weight: 700
			svg
				margin-top: 6px
			.detail
				margin-left: 10px
			span
				color: #aaa
				font-weight: 500
			.user-jurisdiction
				margin-right: 10px
				color: #000
</style>
<style src="@vueform/slider/themes/default.css"></style>
