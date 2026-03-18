<script setup lang="ts">
defineProps<{
  name: string
  color: string
}>()
</script>

<template>
  <svg
    viewBox="0 0 36 36"
    class="size-9"
    :aria-label="name"
  >
    <g transform="translate(18 18)">
      <circle
        r="12"
        :fill="color"
        class="stroke-neutral-500"
        stroke-width="1"
      />
      <circle
        r="16"
        fill="none"
        class="group-data-selected:stroke-blue-700"
        stroke-width="2"
      />
    </g>
  </svg>
</template>
