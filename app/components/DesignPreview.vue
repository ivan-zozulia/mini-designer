<script setup lang="ts">
defineProps<{
  name: string
  img: string
}>()
</script>

<template>
  <div class="rounded-[11%/15%] p-0.5 border-2 border-transparent group-data-selected:border-blue-700">
    <img
      :src="img"
      :alt="name"
      width="36"
      height="27"
      class="block w-9 aspect-4/3 object-cover rounded-[11%/15%] border border-neutral-500"
    >
  </div>
</template>
