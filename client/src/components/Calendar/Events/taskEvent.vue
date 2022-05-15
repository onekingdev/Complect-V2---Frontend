<template lang="pug">
.event.task-event(@click="openTaskModal()" :class="[type, {overdue, completed}, event.cssClasses]" :style="event.titleWidthStyle")
  icon(v-if="event.startsToday && overdue" name="warning")
  icon(v-if="event.startsToday" name="calendar-task")
  icon(v-if="event.startsToday && linked" :name="`calendar-${linked}`")
  .title(v-if="event.showTitle") {{title}}
  .title(v-else) &nbsp;
</template>

<script>
import { inject } from 'vue'
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
    linked: {
      type: String,
      default: '',
      required: false
    },
    type: {
      type: String,
      default: '',
      required: false
    },
    completed: Boolean,
    overdue: Boolean
  },
  setup (props) {
    const modal = inject('modal')
    const openTaskModal = () => modal({ name: 'cModalTask', id: props.id })
    return { openTaskModal }
  }
}
</script>

<style lang="stylus" scoped>
.task-event
  background: #1AB27F
  &.assigned
    background: #BE30AA
</style>
