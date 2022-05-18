<template lang="pug">
.upgrade-card(v-if="!isBusiness")
  icon(name="user" size="huge")
  .upgrade-content
    .upgrade-title Get hired for your next big job.
    .upgrade-description Sign up for a Complect PRO Specialist account and unlock the compliance job board, client compliance program management, and automated invoicing.
  .upgrade-action
    c-button(title="Upgrade Now" type="primary" iconR="chevron-right")
.view
  h1
    b {{$locale("Welcome")}},&nbsp;
    | {{profile.first_name}} {{profile.last_name}}
  .dashboard
    .calendar
      c-calendar(:events="[]")
    card-container.upcoming(title="Upcoming")
      template(#content)
        collapse-container(title="Tasks")
          template(#content)
            c-table(v-bind="{columns, documents}")
        collapse-container(title="Jobs")
          template(#content)
            c-table(v-bind="{columns, documents: projectDocuments}")
</template>

<script>
import { ref } from 'vue'
// import UseData from '~/store/Data.js'
import cCalendar from '~/components/Calendar/cCalendar.vue'
import CollapseContainer from '~/components/Containers/CollapseContainer.vue'
import useProfile from '~/store/Profile.js'
import useBusiness from '~/store/Business.js'

export default {
  components: { cCalendar, CollapseContainer },
  setup () {
    // const projects = new UseData( "projects" );
    const { isBusiness } = useBusiness()
    const { profile } = useProfile()

    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle'
      }, {
        title: 'Due date',
        key: 'ends_on',
        cell: 'CellDate',
        align: 'right'
      }
    ]

    const documents = ref([
      {
        name: 'Task 1',
        ends_on: 1647000337214
      },
      {
        name: 'Task 2',
        ends_on: 1647000337214
      }
    ])

    const projectDocuments = ref([
      {
        name: 'Job 1',
        ends_on: 1647000337214
      },
      {
        name: 'Job 2',
        ends_on: 1647000337214
      }
    ])

    // onMounted( () => projects.readDocuments() );
    // onUnmounted( () => projects.clearStore() );
    return { profile, isBusiness, columns, documents, projectDocuments }
  }
}
</script>

<style lang="stylus" scoped>
.upgrade-card
  margin: 2em 2em 0
  display: flex
  align-items: center
  gap: 1.25em
  padding: 1.5em
  border: 1px solid var(--c-border)
  background: white
  min-width: 44em
  .icon
    width: 3em !important
    height: 3em !important
    margin: 0.5em
  .upgrade-content
    flex: 1
    .upgrade-title
      font-weight: bold
      font-size: 1.5em
    .upgrade-description
      font-size: 0.875em
.view
  padding: 2em
  display: flex
  gap: 1.25em
  flex-wrap: wrap
  h1
    flex: 1 0 auto
  h1
    width: 100%
  .dashboard
    display: flex
    gap: 1.25em
    @media (max-width: 1000px)
      flex-direction: column
    .calendar
      min-width: 44em
    .upcoming
      flex: 1 3 22em
      min-width: 22em
      :deep(.card-header)
        line-height: inherit
      @media (max-width: 1000px)
        flex: 1
</style>
