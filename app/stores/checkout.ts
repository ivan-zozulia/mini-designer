import type { CheckoutForm, OrderErrors } from '~/types'

export const useCheckoutStore = defineStore('checkout', () => {
  const form: CheckoutForm = reactive({ name: '', address: '' })
  const errors = ref<OrderErrors>({})
  const formError = ref('')

  function $reset() {
    form.name = ''
    form.address = ''
    errors.value = {}
    formError.value = ''
  }

  return {
    ...toRefs(form),
    errors,
    formError,
    $reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCheckoutStore, import.meta.hot))
}
