<script setup lang="ts">
const totalPrice = ref(10.5)
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      {{ formatCurrency(totalPrice) }}
    </AppHeader>
    <main>
      <div>
        <ItemPicker />
        <ItemPicker />
      </div>
    </main>
  </div>
</template>
