import { manualApi } from '~/core/api'
import { ref } from 'vue'

export default class ExamRequestService {
  constructor (examId) {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
    this.examId = examId
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async createDocument (data) {
    const doc = await manualApi({ method: 'POST', url: `exams/${this.examId}/exam_requests`, data })
    this.documents.value.push(doc.exam_request)
    return doc.exam.id
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `exams/${this.examId}/exam_requests/${documentId}`, data })
    this.document.value = doc.exam_request
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `exams/${this.examId}/exam_requests/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async completeExam (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `exams/${this.examId}/exam_requests/${documentId}/completed`, data: { completed: isComplete } })
    this.document.value = doc.exam_request
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  setExamId (examId) {
    this.examId = examId
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}
