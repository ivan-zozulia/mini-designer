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
  <PageContent title="Order Success">
    <template #actions>
      <button
        class="btn-secondary"
        @click="designAnother"
      >
        Back
      </button>
    </template>
    <div class="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h2 class="text-3xl md:text-4xl font-light tracking-wide text-gray-500">
        Thank you for your order.
      </h2>
      <button
        class="btn-primary"
        @click="designAnother"
      >
        Design another product
      </button>
    </div>
  </PageContent>
</template>
