import { createApp } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import App from './App.vue'
import Routes from './router/Routes'
import directives from '~/directives/Index.js'
import Locale from './plugins/locales'
import Notifications from './plugins/notifications'
import Modals from './plugins/modals'

import PageContainer from '~/components/Containers/PageContainer.vue'
import MenuContainer from '~/components/Containers/MenuContainer.vue'
import CardContainer from '~/components/Containers/CardContainer.vue'
import DetailContainer from '~/components/Containers/DetailContainer.vue'

import cIcon from '~/components/Icons/cIcon.vue'
import cField from '~/components/Inputs/cField.vue'
import cTextarea from '~/components/Inputs/cTextarea.vue'
import cCheckbox from '~/components/Inputs/cCheckbox.vue'
import cButton from '~/components/Inputs/cButton.vue'
import cLoading from '~/components/Inputs/cLoading.vue'
import cButtonModal from '~/components/Inputs/cButtonModal.vue'
import cNotification from '~/components/Misc/cNotification.vue'
import cTable from '~/components/Table/cTable.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import cDropdownTable from '~/components/Table/cDropdownTable.vue'

import './assets/styles/index.styl'

const app = createApp(App)

directives(app)

app
  .use(Routes)
  .use(Locale)
  .use(Notifications)
  .use(Modals)
  .component('CardContainer', CardContainer)
  .component('DetailContainer', DetailContainer)
  .component('PageContainer', PageContainer)
  .component('MenuContainer', MenuContainer)
  .component('Icon', cIcon)
  .component('cButton', cButton)
  .component('cLoading', cLoading)
  .component('cButtonModal', cButtonModal)
  .component('cField', cField)
  .component('cTextarea', cTextarea)
  .component('cCheckbox', cCheckbox)
  .component('cNotification', cNotification)
  .component('cTable', cTable)
  .component('Editor', Editor)
  .component('draggable', VueDraggableNext)
  .component('cDropdownTable', cDropdownTable)
  .mount('#app')
