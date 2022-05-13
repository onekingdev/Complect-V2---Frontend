<template lang="pug">
c-table(v-bind="{columns, documents}")
c-modal(title="Message" v-model="isMessageVisible")
  template(#content)
    c-chat(:comments="comments")
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import cChat from '~/components/Misc/cChat.vue'
import cModal from '~/components/Misc/cModal.vue'
import ContractService from '~/services/contracts.js'
export default {
  components: { cChat, cModal },
  setup () {
    const contracts = new ContractService('contracts')
    const isMessageVisible = ref(false)

    const handleMessage = () => {
      isMessageVisible.value = !isMessageVisible.value
    }

    const documents = ref([
      {
        id: '6209f90ce4bad73591ee85f2',
        name: 'binh truong',
        location: 'USA',
        status: 'complete',
        rating: {
          max: 5,
          value: 3
        }
      }, {
        id: '621772a4e9dc5a7a8014a9d1',
        name: 'Manuel Special',
        location: 'USA',
        status: 'complete',
        rating: {
          max: 5,
          value: 3
        }
      }
    ])
    const columns = [
      {
        title: 'Name',
        key: 'name',
        cell: 'CellTitle'
      }, {
        title: 'Location',
        key: 'location',
        cell: 'CellTitle'
      }, {
        title: 'Rating',
        key: 'rating',
        cell: 'cellRating'
      }, {
        unsortable: true,
        cell: 'CellDropdown',
        meta: { actions: [{ title: 'Message', action: handleMessage }] }
      }
    ]

    onMounted(() => {
      contracts.readDocuments()
    })
    onUnmounted(() => contracts.clearStore())

    return {
      columns,
      documents,
      isMessageVisible
    }
  }
}
</script>
