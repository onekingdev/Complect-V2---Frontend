<template lang="pug">
.c-calendar-day(:class="{currentMonth: day.currentMonth, today: isToday}")
  .date {{date}}
  .events(v-if="events")
    template(v-for="(event, index) in events.visible" :key="index")
      component(v-if="event" :is="getEventComponent(event.type)" :id="event._id" :event="event" :title="event.title" :linked="event.linked" :completed="event.completed" :overdue="event.overdue")
      .event.event-spacer(v-else): .title &nbsp;
    template(v-if="events.hidden && events.hidden.length")
      c-context-menu(:label="`+${events.hidden.length} more`")
        template(v-for="(event, index) in events.hidden" :key="index")
          component(:is="getEventComponent(event.type)" type="transparent" :id="event._id" :event="event" :title="event.title" :linked="event.linked" :completed="event.completed" :overdue="event.overdue")
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import dayjs from 'dayjs'
import cContextMenu from '~/components/Misc/cContextMenu.vue'
const WEEK_FIRST_DAY = 1 // Monday (1) or Sunday (0) to correctly split tasks by weeks
const WEEK_LAST_DAY = 0

export default {
  components: { cContextMenu },
  props: {
    date: {
      type: String,
      required: true
    },
    day: {
      type: Object,
      required: true
    },
    isToday: Boolean
  },
  setup (props) {
    const getEventComponent = type => defineAsyncComponent(() => import(`./Events/${type}Event.vue`))

    const events = computed(() => {
      if (!props.day.events) return false
      const enrichedEvents = props.day.events.map(event => {
        const startsToday = dayjs(event.startsAt).isSame(props.day.dateFull, 'day')
        const endsToday = dayjs(event.endsAt).isSame(props.day.dateFull, 'day')
        const isWeekStart = dayjs(props.day.dateFull).day() === WEEK_FIRST_DAY
        const showTitle = startsToday || (dayjs(event.startsAt).isBefore(props.day.dateFull, 'day') && isWeekStart)
        const daysToEndOfWeek = dayjs(props.day.dateFull).day() === WEEK_LAST_DAY ? 1 : (8 - dayjs(props.day.dateFull).day())
        const daysToEndOfTask = dayjs(event.endsAt).diff(props.day.dateFull, 'day') + 1
        const titleLengthDays = daysToEndOfWeek <= daysToEndOfTask ? daysToEndOfWeek : daysToEndOfTask
        const titleWidthStyle = showTitle ? `width: calc(${titleLengthDays * 100}% + ${titleLengthDays - 1}px)` : ''
        const isLongTitleEnding = showTitle && titleLengthDays === daysToEndOfTask
        const cssClasses = {
          'event-starts-not-today': !startsToday,
          'event-ends-not-today': !endsToday && !isLongTitleEnding,
          'event-title-long': showTitle
        }
        return { ...event, startsToday, cssClasses, showTitle, titleWidthStyle }
      })
      return enrichedEvents.length < 3
        ? { visible: enrichedEvents, hidden: [] }
        : { visible: enrichedEvents.slice(0, 2), hidden: enrichedEvents.slice(2).filter(e => e) }
    })
    return { events, getEventComponent }
  }
}
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
