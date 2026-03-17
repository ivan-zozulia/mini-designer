<script setup lang="ts">
useSeoMeta({ title: 'Success', description: 'Your order has been placed successfully' })

const designer = useDesignerStore()
const checkout = useCheckoutStore()

function designAnother() {
  designer.$reset()
  checkout.$reset()
  navigateTo('/')
}
</script>

<template>
  <div>
    <AppHeader title="Order Success">
      <button
        class="border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none text-gray-700 font-semibold px-8 py-2 rounded-full transition-colors"
        @click="designAnother"
      >
        Back
      </button>
    </AppHeader>
    <main
      class="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-6"
    >
      <h2 class="text-3xl md:text-4xl font-light tracking-wide text-gray-500">
        Thank you for your order.
      </h2>
      <button
        class="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none text-white font-semibold px-6 py-2 rounded-full transition-colors"
        @click="designAnother"
      >
        Design another product
      </button>
    </main>
  </div>
</template>
