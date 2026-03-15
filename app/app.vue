<script setup lang="ts">
const designer = useDesignerStore()

await callOnce('initial-data', () => designer.fetchData())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
