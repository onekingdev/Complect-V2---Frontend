import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class TaskService {
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
    const doc = await manualApi({ method: 'POST', url: 'tasks', data })
    this.documents.value.push(doc.task)
    return doc.task.id
  }

  async readDocuments (documentsId, query) {
    if (documentsId) {
      const doc = await manualApi({ method: 'GET', url: `tasks/${documentsId}${generateQuery(query)}` })
      this.document.value = doc.task
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `tasks${generateQuery(query)}` })
      this.documents.value = docs.tasks
    }
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `tasks/${documentId}`, data })
    this.document.value = doc.task
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `tasks/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}
