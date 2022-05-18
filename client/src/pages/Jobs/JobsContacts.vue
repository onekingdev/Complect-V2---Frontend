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
        business: { business_name: 'Complect', avatar: 'https://images.unsplash.com/photo-1615087574126-f4f3d62d73cf?ixid=MnwyMzA2MzN8MHwxfGNvbGxlY3Rpb258MXwxMDU4NzEyOHx8fHx8Mnx8MTYyNDg3Nzg1Ng&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60' },
        location: 'Jacksonville, Florida',
        status: 'complete',
        rating: {
          max: 5,
          value: 3
        }
      }, {
        id: '621772a4e9dc5a7a8014a9d1',
        name: 'Manuel Special',
        business: { business_name: 'Complect', avatar: 'https://images.unsplash.com/photo-1585757803404-d36b7a4e16f8?ixid=MnwyMzA2MzN8MHwxfGNvbGxlY3Rpb258MXwzODQ5MTM3OXx8fHx8Mnx8MTYyNDg3ODU1Mg&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60' },
        location: 'Boynton Beach, Florida',
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
        key: 'business',
        cell: 'CellBusiness'
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
        meta: { actions: [{ title: 'Message', action: handleMessage }] },
        align: 'right'
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
