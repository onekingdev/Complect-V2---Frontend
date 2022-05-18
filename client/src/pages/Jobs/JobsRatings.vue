<template lang="pug">
c-list(:data="documents")
</template>

<script>
import { ref } from 'vue'
import cList from '~/components/Misc/cList.vue'
export default {
  components: { cList },
  setup () {
    const documents = ref([
      {
        id: '62281539f4a801ec534af22b',
        name: 'Test Project',
        business: 'Axe Capital | April 15, 2020 - June 5, 2020',
        avatar: 'https://images.unsplash.com/photo-1615087574126-f4f3d62d73cf?ixid=MnwyMzA2MzN8MHwxfGNvbGxlY3Rpb258MXwxMDU4NzEyOHx8fHx8Mnx8MTYyNDg3Nzg1Ng&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
        description: '“Great company to work with. Very cooperative and flexible with time.”',
        rating: {
          max: 5,
          value: 5
        }
      }, {
        id: '62281539f4a801ec534af22b',
        name: 'Test Project 1',
        business: 'Axe Capital | April 15, 2020 - June 5, 2020',
        avatar: 'https://images.unsplash.com/photo-1585757803404-d36b7a4e16f8?ixid=MnwyMzA2MzN8MHwxfGNvbGxlY3Rpb258MXwzODQ5MTM3OXx8fHx8Mnx8MTYyNDg3ODU1Mg&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
        description: '“Great company to work with. Very cooperative and flexible with time.”',
        rating: {
          max: 5,
          value: 3
        }
      }
    ])

    return {
      documents
    }
  }
}
</script>
