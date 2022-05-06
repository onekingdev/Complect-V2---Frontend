import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class ExamService {
  constructor () {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async createDocument (data) {
    const doc = await manualApi({ method: 'POST', url: 'exams', data })
    this.documents.value.push(doc.exam)
    return doc.exam.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `exams/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.exam
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `exams${generateQuery(query)}` })
      this.documents.value = docs.exams
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `exams/${documentId}`, data })
    this.document.value = doc.exam
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `exams/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async completeExam (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `exams/${documentId}/completed`, data: { completed: isComplete } })
    this.document.value = doc.exam
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}
