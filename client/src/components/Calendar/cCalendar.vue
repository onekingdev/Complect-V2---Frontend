<template lang="pug">
card-container
	template(#header)
		p {{selectedMonth}}
	template(#controls)
		c-button(type="icon" iconL="chevron-left" @click="changeMonth(-1)")
		//- c-button(title="Today" type="transparent" @click="setToday()")
		c-button(type="icon" iconL="chevron-right" @click="changeMonth(1)")
		c-dropdown.export-events(title="Export" wide)
			.container.date-range-container
				c-field(label="Start Date" type="date" v-model="dateRange.start")
				c-field(label="End Date" type="date" v-model="dateRange.end")
			.container.butotns-container
				c-button(title="Download All" type="link" @click="downloadAllEvents()")
				c-button(title="Download" @click="downloadEvents()")
		//- c-button(iconL="refresh" @click="generateEvents()" type="transparent")
	template(#content)
		.calendar
			.grid
				.week-day.cell(v-for="(weekDay, index) in weekDays" :key="index") {{weekDay}}
				template(v-if="days.length")
					c-calendar-day.cell(
						v-for="(day, index) in days"
						:key="day.dateFull"
						:date="day.dateDay"
						:day="day"
						:is-today="day.dateFull === today")
</template>


<script>
import { ref, computed } from "vue";
import cDropdown from "~/components/Inputs/cDropdown.vue";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import cCalendarDay from "./cCalendarDay.vue";
dayjs.extend( weekday );
dayjs.extend( weekOfYear );
dayjs.extend( isBetween );

// devmode
import { randomMongoId, randomNumber, randomElement, randomBool } from "~/_devmode/generator/components/atoms/utils.js";
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js";
// ------------------------------

export default {
	"components": { cCalendarDay, cDropdown },
	// "props": {
	// 	"events": {
	// 		"type": Array,
	// 		"default": () => []
	// 	}
	// },
	setup () {
		// devmode
		const generatedEvents = () => {
			const events = [];
			for ( let i = 1; i < randomNumber( 100, 200 ); i++ ) {
				const startsAt = randomDatesInRange({
					"q": 1,
					"shift": [
						-40, 40
					]
				})[0];
				const endsAt = startsAt + 86400000 * randomNumber( 1, 10 );
				const type = randomElement([
					"project", "task"
				]);
				const event = {
					"_id": randomMongoId(),
					"title": randomTitles({
						"w": [
							2, 10
						]
					})[0],
					type,
					startsAt,
					endsAt
				};
				if ( endsAt < Date.now() ) event.completed = randomBool( 60 );
				if ( endsAt < Date.now() && !event.completed ) event.overdue = true;

				if ( type === "task" && randomBool( 60 ) ) {
					event.linked = randomElement([
						"project", "review", "policy"
					]);
				}

				events.push( event );
			}
			return events;
		};
		// ------------------------------

		const weekDays = [
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
			"Sun"
		];
		const currentDate = ref( dayjs() );
		const dateRange = ref({
			"start": null,
			"end": null
		});
		const downloadAllEvents = () => console.debug( "downloadAllEvents" );
		const downloadEvents = () => console.debug( "downloadEvents" );

		const selectedMonth = computed( () => currentDate.value.format( "MMMM YYYY" ) );
		const changeMonth = step => currentDate.value = currentDate.value.add( step, "month" );
		const setToday = () => currentDate.value = dayjs();


		const daysInMonth = computed( () => currentDate.value.daysInMonth() );

		const today = computed( () => dayjs().format( "YYYY-MM-DD" ) );
		const month = computed( () => Number( currentDate.value.format( "M" ) ) );
		const year = computed( () => Number( currentDate.value.format( "YYYY" ) ) );
		const getWeekday = date => dayjs( date ).weekday();

		const currentMonthDays = computed( () => [...Array( daysInMonth.value )].map( ( day, index ) => {
			const date = dayjs( `${year.value}-${month.value}-${index + 1}` );
			return {
				"dateDay": date.format( "D" ),
				"dateFull": date.format( "YYYY-MM-DD" ),
				"currentMonth": true
			};
		}) );

		const previousMonthDays = computed( () => {
			const firstDayOfTheMonthWeekday = getWeekday( currentMonthDays.value[0].dateFull );
			const previousMonth = dayjs( `${year.value}-${month.value}-01` ).subtract( 1, "month" );

			// cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
			const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;
			const previousMonthLastMondayDayOfMonth = dayjs( currentMonthDays.value[0].dateFull ).subtract( visibleNumberOfDaysFromPreviousMonth, "day" ).date();

			return [...Array( visibleNumberOfDaysFromPreviousMonth )].map( ( day, index ) => {
				const date = dayjs( `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}` );
				return {
					"dateDay": date.format( "D" ),
					"dateFull": date.format( "YYYY-MM-DD" ),
					"currentMonth": false
				};
			});
		});

		const nextMonthDays = computed( () => {
			const lastDayOfTheMonthWeekday = getWeekday( `${year.value}-${month.value}-${currentMonthDays.value.length}` );
			const nextMonth = dayjs( `${year.value}-${month.value}-01` ).add( 1, "month" );

			const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday;

			return [...Array( visibleNumberOfDaysFromNextMonth )].map( ( day, index ) => {
				const date = dayjs( `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}` );
				return {
					"dateDay": date.format( "D" ),
					"dateFull": date.format( "YYYY-MM-DD" ),
					"currentMonth": false
				};
			});
		});


		const filledDates = ( dates, events ) => {
			dates.forEach( day => {
				events.forEach( event => {
					const startsAt = dayjs( event.startsAt );
					const endsAt = dayjs( event.endsAt );
					const between = dayjs( day.dateFull ).isBetween( startsAt, endsAt, "day", "[]" );
					if ( between ) {
						if ( !day.events ) day.events = [];
						event.duration = endsAt.diff( startsAt, "day" );
						day.events.push( event );
					}
				});
			});
		};


		const days = computed( () => {
			const dates = [
				...previousMonthDays.value, ...currentMonthDays.value, ...nextMonthDays.value
			];
			const events = generatedEvents();
			// const events = props.events
			filledDates( dates, events );
			return dates;
		});

		return { weekDays, selectedMonth, today, days, changeMonth, setToday, dateRange, downloadAllEvents, downloadEvents };
	}
};
</script>

<style lang="stylus" scoped>
.export-events
	.container
		display: flex
		justify-content: space-between
		gap: 1em
		padding: 1em
		.c-field
			flex: 1
	.date-range-container
		.c-field
			width: 9em
.calendar
	overflow: hidden
	.grid
		width: 100%
		display: grid
		grid-template-columns: repeat( 7, minmax(0, 1fr) );
		// grid-template-rows: repeat(6, 1fr)
		border-bottom: 1px solid var(--c-border)
		border-right: 1px solid var(--c-border)
		.cell
			border-top: 1px solid var(--c-border)
			border-left: 1px solid var(--c-border)
		.week-day
			font-size: 0.8em
			line-height: 1.1
			padding: 0.3em
</style>
