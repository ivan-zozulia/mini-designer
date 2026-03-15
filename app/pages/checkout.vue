<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div>
    <AppHeader title="Checkout">
      <NuxtLink
        to="/"
      >
        Back
      </NuxtLink>
    </AppHeader>

    <main>
      <div>
        <span>Total:</span>
        <span>{{
          formatCurrency(designer.totalPrice)
        }}</span>
      </div>
    </main>
  </div>
</template>
