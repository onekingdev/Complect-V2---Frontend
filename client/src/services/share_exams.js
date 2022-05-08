import { manualApi } from '~/core/api'
import { ref } from 'vue'

export default class ShareExamService {
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
    const doc = await manualApi({ method: 'POST', url: `exams/${this.examId}/share_exams`, data })
    this.documents.value.push(doc.share_exam)
    return doc.exam.id
  }

  async readDocuments () {
    const docs = await manualApi({ method: 'GET', url: `exams/${this.examId}/share_exams` })
    this.documents.value = docs.share_exams
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `exams/${this.examId}/share_exams/${documentId}` })
    this.document.value = {}
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
