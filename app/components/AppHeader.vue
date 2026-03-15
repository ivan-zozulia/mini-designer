<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="bg-slate-200 px-8 py-5 flex items-center justify-between">
    <h1 class="text-3xl font-semibold text-emerald-500">
      {{ title }}
    </h1>
    <div class="flex items-center gap-4">
      <slot />
    </div>
  </header>
</template>
