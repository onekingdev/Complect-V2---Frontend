<template lang="pug">
.cell-business
  c-avatar(:businessName="data.business_name" :avatar="data.avatar")
  .info
    .name {{ `${data.business_name}` }}
</template>

<script>
import cAvatar from '~/components/Misc/cAvatar.vue'
export default {
  components: { cAvatar },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ businessName: '' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cell-business
  .c-avatar
    margin-right: 0.5em
</style>
