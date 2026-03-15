<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <span>
        {{ formatCurrency(designer.totalPrice) }}
      </span>
      <NuxtLink to="/checkout">Go to Checkout</NuxtLink>
    </AppHeader>
    <main>
      <div>
        <ItemPicker />
        <ItemPicker />
      </div>
    </main>
  </div>
</template>
