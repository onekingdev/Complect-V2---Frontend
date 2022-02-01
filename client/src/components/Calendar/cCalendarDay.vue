<template lang="pug">
.c-calendar-day(:class="{currentMonth: day.currentMonth, today: isToday}")
	.date {{date}}
	.events(v-if="events")
		template(v-for="(event, index) in events.visible" :key="index")
			component(:is="getEventComponent(event.type)" :id="event._id" :title="event.title" :linked="event.linked" :completed="event.completed" :overdue="event.overdue")
		template(v-if="events.hidden && events.hidden.length")
			c-context-menu(:label="`+${events.hidden.length} more`")
				template(v-for="(event, index) in events.hidden" :key="index")
					component(:is="getEventComponent(event.type)" type="transparent" :id="event._id" :title="event.title" :linked="event.linked" :completed="event.completed" :overdue="event.overdue")
</template>


<script>
import { computed, defineAsyncComponent } from "vue";
import cContextMenu from "~/components/Misc/cContextMenu.vue";
export default {
	"components": { cContextMenu },
	"props": {
		"date": {
			"type": String,
			"required": true
		},
		"day": {
			"type": Object,
			"required": true
		},
		"isToday": Boolean
	},
	setup ( props ) {
		const getEventComponent = type => defineAsyncComponent( () => import( `./Events/${type}Event.vue` ) );

		const events = computed( () => {
			if ( !props.day.events ) return false;
			const visible = [];
			const hidden = [];
			props.day.events.forEach( ( event, index ) => {
				if ( index < 2 ) visible.push( event );
				else hidden.push( event );
			});
			return { visible, hidden };
		});
		return { events, getEventComponent };
	}
};
</script>


<style lang="stylus" scoped>
.c-calendar-day
	color: #DCDEE4
	font-size: 0.8em
	user-select: none
	height: 8em
	&.currentMonth
		color: #303132
	&.today
		background: #F3F6F9
	.date
		padding: 0.3em
	.events
		:deep(.event)
			border-radius: 0.4em
			display: flex
			align-items: center
			color: #fff
			padding: 0.2em 0.5em
			line-height: 1.3
			margin-bottom: 0.2em
			cursor: pointer
			svg.icon
				fill: #fff
				margin-right: 0.4em
			.title
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
			&.completed
				background: #E2E8F0
			&.overdue
				background: #FFF7E4
				outline: #DCDEE4 solid 1px
			&.completed, &.overdue
				color: #303132
				svg.icon
					fill: #565759
			&.transparent
				background: #fff
				color: #303132
				outline: none
				svg.icon
					fill: #565759
				&:hover
					background: #f8f8f8
	.c-dropdown
		:deep(.c-button)
			justify-content: flex-start
		:deep(svg.icon)
			fill: #000
</style>
