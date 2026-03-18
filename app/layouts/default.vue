<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const route = useRoute()
const isCompact = useMediaQuery('(max-width: 639px)', {
  ssrWidth: 640,
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <slot />
    <footer
      class="mt-auto px-6 py-10"
      :class="{ 'mb-16': route.meta.hasFixedBar && isCompact }"
    >
      <div class="max-w-4xl mx-auto">
        <div class="text-sm text-gray-500 text-center md:text-left">
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
