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
      class="mt-auto py-4 px-4"
      :class="{ 'mb-16': route.meta.hasFixedBar && isCompact }"
    >
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center">
          <NuxtLink
            to="/about"
            class="text-sm font-semibold hover:underline"
          >
            About this project
          </NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
