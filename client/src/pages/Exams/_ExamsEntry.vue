<template lang="pug">
page-container(title="Exam Management")
  template(#controls)
    c-button(title="New Exam" type="primary" @click="createExam()")
  template(#content)
    router-view
</template>

<script>
import { inject } from 'vue'

export default {
  setup () {
    const modal = inject('modal')

    const createExam = () => modal({ name: 'cModalExam' })

    return { createExam }
  }
}
</script>
