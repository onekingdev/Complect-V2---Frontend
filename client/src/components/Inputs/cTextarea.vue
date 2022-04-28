<template lang="pug">
label.c-input.c-textarea(:class="{fullwidth}")
  .field-label(v-if="label") {{ label }}
    span.required(v-if="required") *
  textarea.field-body(
    ref="root"
    :class="{'errors': errors && errors.length}"
    :placeholder="placeholder"
    :required="required"
    :tabIndex="tabIndex"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue")
  .field-info.error(v-if="errors && errors.length")
    p(v-for="(error, index) in errors" :key="index") {{error}}
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  props: {
    label: {
      type: String,
      default: '',
      required: false
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    modelValue: {
      type: [
        String, Array, Number
      ],
      required: true
    },
    errors: {
      type: Array,
      default: () => []
    },
    fullwidth: {
      type: Boolean,
      default: true
    },
    autosize: {
      type: Boolean,
      default: false
    },
    required: Boolean
  },
  emits: ['update:modelValue'],
  setup (props) {
    const root = ref(null)

    const resize = ele => {
      ele.target.style.height = 'auto'
      ele.target.style.height = `${ele.target.scrollHeight}px`
    }

    const setResizeListeners = target => {
      target.style.height = `${target.scrollHeight}px`
      target.addEventListener('input', resize)
    }

    onMounted(() => {
      if (props.autosize) setResizeListeners(root.value)
    })

    return { root }
  }
}
</script>

<style lang="stylus" scoped>
.c-textarea
  min-width: 8em
  .field-label
    font-size: 0.8em
    margin-bottom: 0.2em
    color: #666
    span.required
      color: var(--c-red)
      line-height: 1
      font-weight: bold
      margin-left: 0.2em
  .field-body
    background: var(--c-bg-z2)
    box-shadow: 0 0 0 1px var(--c-border)
    border-radius: var(--v-inputs-border-radius)
    border: none
    overflow: hidden
    font-size: 0.9em
    width: 100%
    padding: 0.35em 0.5em
    outline: none
    line-height: 1.3
    min-height: 5em
    resize: vertical
    max-height: 4em
    overflow-y: scroll
    &::placeholder
      color: #999
      font-size: 0.9em
    &.errors
      box-shadow: 0 0 0 1px #f00
  .field-info
    font-size: 0.7em
    margin-top: 0.3em
    &.error
      color: red
  &.fullwidth
    width: 100%
</style>
