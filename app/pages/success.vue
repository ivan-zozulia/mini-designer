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
      >
        Back
      </NuxtLink>
    </AppHeader>
    <main
      class="flex-1 flex flex-col items-center justify-center gap-6"
    >
      <h2>
        Thank you for your order.
      </h2>
      <button
        class="bg-blue-500"
        @click="designAnother"
      >
        Design another product
      </button>
    </main>
  </div>
</template>
