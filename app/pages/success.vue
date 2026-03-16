<script setup lang="ts">
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
    <AppHeader title="Order success">
      <NuxtLink
        to="/"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-full transition-colors"
      >
        Back
      </NuxtLink>
    </AppHeader>
    <main
      class="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-6"
    >
      <h2 class="text-3xl md:text-4xl font-light tracking-wide text-gray-500">
        Thank you for your order.
      </h2>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
        @click="designAnother"
      >
        Design another product
      </button>
    </main>
  </div>
</template>
