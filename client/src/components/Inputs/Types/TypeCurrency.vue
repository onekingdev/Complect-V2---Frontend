<template lang="pug">
.currency-content
  input(type="number" @change="updateModelValue()" v-model="newValue" @keydown="" :class="{'hasValue': newValue}")
  span.currency(:class="{'hasValue': newValue}") $
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    value: {
      type: Number,
      default: null,
      required: false
    }
  },
  emits: ['updateValue'],
  setup (props, context) {
    const newValue = ref(props.value)
    const updateModelValue = () => context.emit('updateValue', parseInt(newValue, 10))
    return { updateModelValue, newValue }
  }
}
</script>
<style lang="stylus" scoped>
.currency-content
  position: relative
  input
    color: #000
    background: transparent
    border: none
    outline: none
    padding: 0
    margin: 0
    &.hasValue
      padding-left: 0.8em
  .currency
    display: none
    position: absolute
    left: 0
    &.hasValue
      display: inline
</style>
