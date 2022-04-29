<template lang="pug">
.form-view
  .form-header
    h1 Form Library
  .form-content
    c-form-card(v-for="(card, index) in cards" v-bind="card" :key="index")
</template>

<script>
import cFormCard from '~/components/Misc/cFormCard.vue'
export default {
  components: { cFormCard },
  setup () {
    const cards = [
      {
        type: 'attestation',
        title: 'Attestation Forms',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        formCount: '1',
        routeName: 'FormLibraryEntry'
      }, {
        type: 'logs',
        title: 'Employee Log Forms',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        formCount: '1',
        routeName: 'FormLibraryEntry'
      }, {
        type: 'approval',
        title: 'Pre-Approval Forms',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        formCount: '1',
        routeName: 'FormLibraryEntry'
      }
    ]

    return { cards }
  }
}
</script>

<style lang="stylus" scoped>
.form-view
  padding: 1.25em 2.5em
  .form-header
    padding: 1.5em 0
    margin-bottom: 1.25em
    h1
      font-size: 1.5em
  .form-content
    display: flex
    gap: 1.25em
</style>
