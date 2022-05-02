<template lang="pug">
.cell-collaborators(v-if="data && data.length")
  template(v-for="(user, index) in data")
    c-avatar(size="small" :avatar="user.avatar" :firstName="user.first_name" :lastName="user.last_name" :title="`${user.firstName} ${user.lastName}`" v-if="index < 2")
  span.more-collaborators(v-if="data.length > 2") +1
</template>

<script>
import cAvatar from '~/components/Misc/cAvatar.vue'
export default {
  components: { cAvatar },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.cell-collaborators
  gap: 0.3em
.more-collaborators
  color: var(--c-blue)
</style>
