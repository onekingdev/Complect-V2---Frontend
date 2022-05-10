import { manualApi } from '~/core/api'

const getStripePayments = async () => {
  const docs = await manualApi({ method: 'GET', url: 'payment_methods' })
  return docs.payment_methods
}
const addStripePayment = async data => {
  const docs = await manualApi({ method: 'POST', url: 'payment_methods', data })
  return docs
}
const deleteStripePayment = async id => {
  const docs = await manualApi({ method: 'DELETE', url: `payment_methods/${id}` })
  return docs
}
const upgradeSubsciption = async data => {
  const docs = await manualApi({ method: 'POST', url: 'upgrades', data })
  return docs
}

export { getStripePayments, addStripePayment, deleteStripePayment, upgradeSubsciption }
