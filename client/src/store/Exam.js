import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UseData from '~/store/Data.js'
import { notifyMessages } from '~/data/notifications.js'

const exam = ref({})
const requestDocuments = ref([])

export default function useExamDetail () {
  const router = useRouter()
  const route = useRoute()
  const notification = inject('notification')
  const modal = inject('modal')
  const exams = new UseData('exams')
  const requests = new UseData('exam_requests')
  const id = route.params.id

  const handleSuccessCompleteExam = () => exam.value.completed = true
  const callBackComplete = { handleSuccess: handleSuccessCompleteExam }
  const markAsComplete = () => modal({ name: 'cModalCompleteExam', id, callBack: callBackComplete })

  const markAsInComplete = async () => {
    try {
      await exams.updateDocument(id, { completed: false })
      notification({
        type: 'success',
        title: 'Success',
        message: notifyMessages.exam.incomplete.success
      })
      exam.value.completed = false
    } catch (error) {
      console.error(error)
      notification({
        type: 'error',
        title: 'Error',
        message: notifyMessages.exam.incomplete.error
      })
    }
  }

  const exitExamDetail = () => router.push({ name: 'ExamsOverview' })

  const saveExam = async (exit = false) => {
    const updatingList = []
    requestDocuments.value.forEach(req => {
      updatingList.push(requests.updateDocument(req._id, req))
    })
    try {
      await Promise.all(updatingList)
      notification({
        type: 'success',
        title: 'Success',
        message: notifyMessages.exam.save.success
      })
      if (exit) exitExamDetail()
    } catch (err) {
      notification({
        type: 'error',
        title: 'Error',
        message: notifyMessages.exam.save.error
      })
    }
  }

  onMounted(async () => {
    await exams.readDocuments(id)
    exam.value = exams.getDocument().value
  })

  onUnmounted(() => exams.clearStore())

  return {
    router,
    notification,
    modal,
    id,
    exams,
    requests,
    exam,
    requestDocuments,
    markAsComplete,
    markAsInComplete,
    saveExam,
    exitExamDetail
  }
}
