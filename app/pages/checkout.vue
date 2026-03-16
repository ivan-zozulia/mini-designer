<script setup lang="ts">
import { FetchError } from 'ofetch'
import type { CheckoutForm, OrderErrorResponse } from '~/types'

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
    // https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-handling-errors
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
      <div class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div class="lg:w-1/3">
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
        <div class="lg:w-1/3 border border-gray-200 rounded-xl p-6">
          <h2 class="text-2xl font-light tracking-wide mb-6">
            Order Data
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-semibold">Design:</span>
              <span class="font-semibold tabular-nums">{{
                formatCurrency(designer.selectedDesign?.price ?? 0)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Shirt:</span>
              <span class="font-semibold tabular-nums">{{
                formatCurrency(designer.selectedColor?.price ?? 0)
              }}</span>
            </div>
          </div>
          <hr class="my-6">
          <div class="flex justify-between">
            <span class="text-xl font-semibold">Total:</span>
            <span class="text-xl font-semibold tabular-nums">{{
              formatCurrency(designer.totalPrice)
            }}</span>
          </div>
        </div>
        <div class="lg:w-1/3 border border-gray-200 rounded-xl p-6">
          <h2 class="text-2xl font-light tracking-wide mb-6">
            Personal Data
          </h2>
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
            <div class="pt-4 flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-green-400 hover:bg-green-500 active:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:outline-none text-white font-semibold px-12 py-2 rounded-full transition-colors disabled:opacity-50"
              >
                Buy
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
