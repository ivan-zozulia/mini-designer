<script setup lang="ts">
const { value } = defineProps<{
  value: unknown
}>()

const ctx = useListboxContext()

ctx.registerItem(value)
onUnmounted(() => ctx.unregisterItem(value))
</script>

<template>
  <div
    v-show="ctx.isVisible(value)"
    role="option"
    :aria-selected="ctx.isSelected(value)"
    :data-selected="ctx.isSelected(value) ? '' : undefined"
    :data-highlighted="ctx.isHighlighted(value) ? '' : undefined"
    @pointerdown="ctx.clearKeyboardNav()"
    @click="ctx.onValueChange(value)"
  >
    <slot />
  </div>
</template>
