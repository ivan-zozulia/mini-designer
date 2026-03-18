<script setup lang="ts">
const ctx = useListboxContext()
</script>

<template>
  <button
    data-testid="select-prev"
    aria-label="Select previous item"
    type="button"
    :disabled="!ctx.canSelectPrev.value"
    :data-disabled="!ctx.canSelectPrev.value ? '' : undefined"
    tabindex="-1"
    @click="ctx.selectPrev()"
  >
    <slot />
  </button>
</template>
