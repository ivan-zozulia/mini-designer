<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <span>
        {{ formatCurrency(designer.totalPrice) }}
      </span>
    </AppHeader>
    <main>
      <div>
        <ItemPicker />
        <ItemPicker />
      </div>
    </main>
  </div>
</template>
