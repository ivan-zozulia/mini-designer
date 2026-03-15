<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <span class="text-xl font-semibold tabular-nums">{{
        formatCurrency(designer.totalPrice)
      }}</span>
      <NuxtLink
        to="/checkout"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
      >
        Go to Checkout
      </NuxtLink>
    </AppHeader>
    <main class="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 p-4 md:p-8">
      <div class="shrink-0 order-2 md:order-1">
        <ItemPicker />
        <ItemPicker />
      </div>
    </main>
  </div>
</template>
