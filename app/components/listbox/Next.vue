<script setup lang="ts">
const ctx = useListboxContext()
</script>

<template>
  <button
    data-testid="select-next"
    aria-label="Select next item"
    type="button"
    :disabled="!ctx.canSelectNext.value"
    :data-disabled="!ctx.canSelectNext.value ? '' : undefined"
    tabindex="-1"
    @click="ctx.selectNext()"
  >
    <slot />
  </button>
</template>
