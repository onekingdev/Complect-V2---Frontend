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
export default {
  components: { cChat, cModal },
  setup () {
    const { profile } = useProfile()
    const contracts = new UseData('contracts')
    const users = new UseData('users')
    const isMessageVisible = ref(false)
    // const documents = computed( () => {
    //   const allContracts = contracts.getDocuments();
    //   const allUsers = users.getDocuments();
    //   const allContact = [];
    //   for ( let i = 0; i < allContracts.length; i++ ) {
    //     const contactUser = allUsers.find( user => user._id === allContracts[i].specialist );
    //     const checkUser = allContact.find( contact => contact._id === contactUser._id );
    //     if ( !checkUser ) {
    //       allContact.push({
    //         "name": `${contactUser.firstName} ${contactUser.lastName}`,
    //         "location": contactUser.location,
    //         "status": allContracts[i].status,
    //         "rating": {
    //           "max": 5,
    //           "value": contactUser.rating
    //         }
    //       });
    //     }
    //   }
    //   return allContact;
    // });

    const handleMessage = () => {
      isMessageVisible.value = !isMessageVisible.value
    }

    const documents = ref([
      {
        _id: '6209f90ce4bad73591ee85f2',
        name: 'binh truong',
        location: 'USA',
        status: 'complete',
        rating: {
          max: 5,
          value: 3
        }
      }, {
        _id: '621772a4e9dc5a7a8014a9d1',
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
      contracts.readDocuments('', { business: profile.value.businessId })
      users.readDocuments()
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
