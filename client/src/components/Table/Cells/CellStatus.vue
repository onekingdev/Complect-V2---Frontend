<template lang="pug">
.cell-status(v-if="data")
  c-badge(:title="data")
</template>

<script>
import cBadge from '~/components/Misc/cBadge.vue'
export default {
  components: { cBadge },
  props: {
    data: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.cell-status
  max-width: 10em
</style>
