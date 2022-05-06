import { manualApi, generateQuery } from '~/core/api'
import { ref } from 'vue'

export default class ReviewCategoryService {
  constructor (reviewId) {
    this.document = ref({})
    this.documents = ref([])
    this.documentJson = ref('')
    this.reviewId = reviewId
  }

  getDocument () {
    return this.document
  }

  getDocuments () {
    return this.documents
  }

  async createDocument (data) {
    const doc = await manualApi({ method: 'POST', url: `internal_reviews/${this.reviewId}/internal_review_categories`, data })
    this.documents.value.push(doc)
    return doc.id
  }

  async updateDocument (documentId, data) {
    const doc = await manualApi({ method: 'PUT', url: `internal_reviews/${this.reviewId}/internal_review_categories/${documentId}`, data })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async deleteDocuments (documentId) {
    await manualApi({ method: 'DELETE', url: `internal_reviews/${this.reviewId}/internal_review_categories/${documentId}` })
    this.document.value = {}
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  async readDocuments (documentId, query) {
    if (documentId) {
      const doc = await manualApi({ method: 'GET', url: `internal_reviews/${this.reviewId}/internal_review_categories/${documentId}${generateQuery(query)}` })
      this.document.value = doc
      this.documentJson.value = JSON.stringify(this.document.value)
    } else {
      const docs = await manualApi({ method: 'GET', url: `internal_reviews/${this.reviewId}/internal_review_categories${generateQuery(query)}` })
      this.documents.value = docs.categories
    }
  }

  async completeCategory (documentId, isComplete) {
    const doc = await manualApi({ method: 'POST', url: `internal_reviews/${this.reviewId}/internal_review_categories/${documentId}/completed`, data: { completed: isComplete } })
    this.document.value = doc
    this.documentJson.value = JSON.stringify(this.document.value)
  }

  setReviewId (reviewId) {
    this.reviewId = reviewId
  }

  clearStore () {
    this.documents.value = []
    this.document.value = {}
  }
}
