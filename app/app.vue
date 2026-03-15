<script setup lang="ts">
const designer = useDesignerStore()

await callOnce(() => designer.fetchData())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
