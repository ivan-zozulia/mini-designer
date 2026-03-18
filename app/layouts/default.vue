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
      class="mt-auto px-4 py-10"
      :class="{ 'mb-16': route.meta.hasFixedBar && isCompact }"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-sm text-gray-500">
          <NuxtLink
            to="/about"
            class="hover:underline"
          >
            About this project
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
