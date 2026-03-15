<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <div>
      <slot />
    </div>
  </header>
</template>
