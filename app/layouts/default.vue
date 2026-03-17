<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const route = useRoute()
const isCompact = useMediaQuery('(max-width: 639px)', {
  ssrWidth: 640,
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot />
    <footer
      class="px-8 py-5 mt-auto"
      :class="{ 'mb-16': route.meta.hasFixedBar && isCompact }"
    >
      <NuxtLink
        to="/about"
        class="text-sm font-semibold hover:underline"
      >
        About this project
      </NuxtLink>
    </footer>
  </div>
</template>
