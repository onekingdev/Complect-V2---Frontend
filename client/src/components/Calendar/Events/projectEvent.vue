<template lang="pug">
router-link(:to="{name: 'ProjectDetail', params: {id: id}}" :style="event.titleWidthStyle" :class="{'event-title-long': event.showTitle}")
  .event.project-event(:class="[type, {overdue, completed}, event.cssClasses]")
    icon(v-if="event.startsToday" name="calendar-project")
    .title {{event.showTitle ? title : '&nbsp;'}}
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    event: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: '',
      required: false
    },
    completed: Boolean,
    overdue: Boolean
  }
}
</script>

<style lang="stylus" scoped>
.project-event
  background: #0479FF
</style>
