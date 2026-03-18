<script setup lang="ts">
import { FetchError } from 'ofetch'
import type { CheckoutForm, OrderErrorResponse } from '~/types'

useSeoMeta({ title: 'Checkout', description: 'Complete your order' })

const designer = useDesignerStore()
const checkout = useCheckoutStore()

const isSubmitting = ref(false)

function isOrderErrorResponse(data: unknown): data is OrderErrorResponse {
  return typeof data === 'object' && data !== null && 'errors' in data
}

async function submitOrder() {
  checkout.errors = {}
  checkout.formError = ''
  isSubmitting.value = true

  try {
    await $fetch('/api/order', {
      method: 'POST',
      body: {
        name: checkout.name,
        address: checkout.address,
      } satisfies CheckoutForm,
    })
    navigateTo('/success')
  }
  catch (e: unknown) {
    if (e instanceof FetchError && isOrderErrorResponse(e.data)) {
      const data = e.data
      checkout.errors = data.errors
      checkout.formError = data.message
    }
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <PageContent title="Checkout">
    <template #actions>
      <NuxtLink
        to="/"
        class="btn-secondary"
      >
        Back
      </NuxtLink>
    </template>
    <form
      class="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-sm md:max-w-none mb-8 md:mt-12"
      @submit.prevent="submitOrder"
    >
      <div class="md:order-1">
        <ProductPreview class="w-48 mx-auto mt-5 mb-14 md:mt-12" />
      </div>
      <div>
        <div>
          <h2 class="text-lg leading-7 font-medium text-gray-800">
            Personal Data
          </h2>
          <div class="mt-4 grid grid-cols-1 gap-6">
            <div
              v-if="checkout.formError"
              class="p-4 bg-red-50 rounded-md mt-2 border border-red-200"
              aria-live="polite"
            >
              <h3 class="text-red-800 text-sm leading-5 font-medium">
                {{ checkout.formError }}
              </h3>
            </div>
            <FormInput
              id="order-name"
              v-model="checkout.name"
              label="Name"
              type="text"
              name="name"
              autocomplete="name"
              :errors="checkout.errors.name"
            />
            <FormInput
              id="order-address"
              v-model="checkout.address"
              label="Address"
              type="text"
              name="address"
              autocomplete="street-address"
              :errors="checkout.errors.address"
            />
          </div>
        </div>
        <div class="mt-10">
          <h2 class="text-lg leading-7 font-medium text-gray-800">
            Order Data
          </h2>
          <div class="mt-4 border border-gray-200 rounded-lg shadow-xs bg-white">
            <div class="py-6 px-4">
              <div class="flex justify-between mb-6 text-sm leading-5">
                <div>
                  Design
                </div>
                <div class="font-medium text-gray-900 tabular-nums">
                  {{
                    formatCurrency(designer.selectedDesign?.price ?? 0)
                  }}
                </div>
              </div>
              <div class="flex justify-between mb-6 text-sm leading-5">
                <div>
                  Shirt
                </div>
                <div class="font-medium text-gray-900 tabular-nums">
                  {{
                    formatCurrency(designer.selectedColor?.price ?? 0)
                  }}
                </div>
              </div>
              <div class="flex justify-between border-t border-t-gray-200 pt-6 leading-6 font-medium text-gray-900">
                <div>
                  Total
                </div>
                <div class="tabular-nums">
                  {{
                    formatCurrency(designer.totalPrice)
                  }}
                </div>
              </div>
            </div>
            <div class="py-6 px-4 border-t border-t-gray-200">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="block w-full btn-primary py-3 px-4 leading-6"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </PageContent>
</template>
