<template lang="pug">
c-table(v-bind="{columns, documents}")
c-modal(title="Message" v-model="isMessageVisible")
  template(#content)
    c-chat(:comments="comments")
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import useProfile from '~/store/Profile.js'
import cChat from '~/components/Misc/cChat.vue'
import cModal from '~/components/Misc/cModal.vue'
import UseData from '~/store/Data.js'
// import { formatDate } from "~/core/utils";
export default {
  components: { cChat, cModal },
  setup () {
    const { profile } = useProfile()
    const contracts = new UseData('contracts')
    const users = new UseData('users')
    // const documents = computed( () => {
    //   const allContracts = contracts.getDocuments();
    //   const allUsers = users.getDocuments();
    //   const returnContract = [];
    //   for ( let i = 0; i < allContracts.length; i++ ) {
    //     const contactUser = allUsers.find( user => user.id === allContracts[i].specialist );
    //     returnContract.push({
    //      "id": allContracts[i].projectId,
    //       "name": allContracts[i].name,
    //       "special": `${contactUser.firstName} ${contactUser.lastName} | ${formatDate(allContracts[i].startsAt)} - ${formatDate(allContracts[i].endsAt)}`,
    //       "description": allContracts[i].description,
    //       "rating": {
    //         "max": 5,
    //         "value": contactUser.rating
    //       }
    //     });

    //   }
    //   return returnContract;
    // });

    const documents = ref([
      {
        id: '62281539f4a801ec534af22b',
        name: 'Test Contract',
        specialist: 'bihn turong | 4/15/2020 ~ 6/5/2021',
        description: 'This is test description',
        rating: {
          max: 5,
          value: 5
        }
      }, {
        id: '62281539f4a801ec534af22b',
        name: 'Test Contract 1',
        specialist: 'Manuel Special | 4/15/2022 ~ 6/5/2022',
        description: 'This is test description',
        rating: {
          max: 5,
          value: 3
        }
      }
    ])
    const columns = [
      {
        title: 'Contract Name',
        key: 'name',
        cell: 'CellTitle',
        meta: { link: 'ProjectDetail' }
      }, {
        title: 'Specialist',
        key: 'specialist',
        cell: 'CellTitle'
      }, {
        title: 'Description',
        key: 'description',
        cell: 'CellTitle'
      }, {
        title: 'Rating',
        key: 'rating',
        cell: 'cellRating'
      }
    ]

    onMounted(() => {
      contracts.readDocuments('', { business: profile.value.businessId })
      users.readDocuments()
    })
    onUnmounted(() => contracts.clearStore())

    return {
      columns,
      documents
    }
  }
}
</script>
