<template lang="pug">
label
  .item-label(v-if="label")
    | {{ label }}
    icon(v-if="iconR" :name="iconR.name" @click="iconR.handleClick()") :
    span.required(v-if="required") *
  slot
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    iconR: {
      type: Object,
      default: () => {}
    },
    required: Boolean
  }
}
</script>

<style lang="stylus" scoped>
label
  .item-label
    font-size: 0.875em
    margin-bottom: 0.2em
    color: #666
    span.required
      color: var(--c-red)
      line-height: 1
      font-weight: bold
      margin-left: 0.2em
</style>
