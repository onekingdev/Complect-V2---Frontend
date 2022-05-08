import { manualApi } from '~/core/api'

const getStripePayments = async () => {
  const docs = await manualApi({ method: 'GET', url: 'payment_methods' })
  return docs
}
const addStripePayment = async data => {
  const docs = await manualApi({ method: 'POST', url: 'payment_methods', data })
  return docs
}

export { getStripePayments, addStripePayment }
