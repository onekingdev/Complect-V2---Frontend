import { ref } from 'vue'

const business = ref(null)

export default function useBusiness () {
  const setBusiness = data => business.value = data

  return {
    business,
    isBusiness: business.value && business.value?.owner,
    setBusiness
  }
}
