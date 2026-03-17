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
  <div>
    <AppHeader title="Checkout">
      <NuxtLink
        to="/"
        class="border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none text-gray-700 font-semibold px-8 py-2 rounded-full transition-colors"
      >
        Back
      </NuxtLink>
    </AppHeader>
    <main class="flex-1 p-4 md:p-8">
      <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <div class="order-2 md:order-first">
          <div>
            <h2>Order Data</h2>
            <div>
              <div class="flex justify-between">
                <span>Design:</span>
                <span class="tabular-nums">{{
                  formatCurrency(designer.selectedDesign?.price ?? 0)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span>Shirt:</span>
                <span class="tabular-nums">{{
                  formatCurrency(designer.selectedColor?.price ?? 0)
                }}</span>
              </div>
            </div>
            <div class="flex justify-between">
              <span>Total:</span>
              <span class="tabular-nums">{{
                formatCurrency(designer.totalPrice)
              }}</span>
            </div>
          </div>
          <div>
            <h2>Personal Data</h2>
            <p
              v-if="checkout.formError"
              class="text-red-500 text-sm mb-4"
              aria-live="polite"
            >
              {{ checkout.formError }}
            </p>
            <form
              class="space-y-4"
              @submit.prevent="submitOrder"
            >
              <FormInput
                id="order-name"
                v-model="checkout.name"
                label="Name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="Enter your name"
                :errors="checkout.errors.name"
              />
              <FormInput
                id="order-address"
                v-model="checkout.address"
                label="Address"
                type="text"
                name="address"
                autocomplete="street-address"
                placeholder="Enter your address"
                :errors="checkout.errors.address"
              />
              <button
                type="submit"
                :disabled="isSubmitting"
                class="block w-full bg-green-600 hover:bg-green-700 active:bg-green-800 focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:outline-none text-white font-semibold px-12 py-2 rounded-full transition-colors disabled:opacity-50"
              >
                Buy
              </button>
            </form>
          </div>
        </div>
        <div>
          <div class="max-w-xs mx-auto">
            <TShirt
              v-if="designer.selectedColor && designer.selectedDesign"
              :color="designer.selectedColor.color"
              :design-img="designer.selectedDesign.img"
            />
          </div>
          <div
            class="mt-4 text-sm font-semibold text-center lg:text-left"
          >
            <p>Design: {{ designer.selectedDesign?.name }}</p>
            <p>Shirt: {{ designer.selectedColor?.name }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
