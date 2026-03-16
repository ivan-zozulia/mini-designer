<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="border border-gray-200 rounded-xl p-6">
    <h2 class="text-2xl font-light tracking-wide mb-6">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
