<template lang="pug">
input(type="text" @change="updateModelValue()" v-model="newValue")
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: {
    value: {
      type: String,
      default: null,
      required: false
    }
  },
  emits: ['updateValue'],
  setup (props, context) {
    const formatPhone = phoneNumber => {
      if (!phoneNumber) return ''
      if (phoneNumber.length > 3 && phoneNumber.length < 11) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`
      else if (phoneNumber.length === 11) return `+ ${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 11)}`
      else if (phoneNumber.length > 11) return `+ ${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 12)}`
      return phoneNumber
    }
    const newValue = ref(formatPhone(props.value))
    watch(() => newValue.value, () => {
      if (!newValue.value) return
      const phoneNumber = newValue.value.replace(/[^0-9]/g, '')
      newValue.value = formatPhone(phoneNumber)
    })
    const updateModelValue = () => context.emit('updateValue', newValue.value.replace('+', '').replace(/ /g, ''))
    return { updateModelValue, newValue }
  }
}
</script>
