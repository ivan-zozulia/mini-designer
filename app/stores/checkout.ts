import type { CheckoutForm, OrderErrors } from '~/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const form: CheckoutForm = reactive({ name: '', address: '' })
  const errors = ref<OrderErrors>({})
  const generalError = ref('')

  function $reset() {
    form.name = ''
    form.address = ''
    errors.value = {}
    generalError.value = ''
  }

  return {
    ...toRefs(form),
    errors,
    generalError,
    $reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}
