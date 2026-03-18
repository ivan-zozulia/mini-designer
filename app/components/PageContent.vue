<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

defineProps<{
  title: string
}>()

const route = useRoute()
const sentinel = useTemplateRef('sentinel')
const isStuck = ref(false)

useIntersectionObserver(sentinel, ([entry]) => {
  if (entry) {
    isStuck.value = !entry.isIntersecting
  }
})

const classNames = computed(() => ({
  'sm:sticky': route.meta.hasFixedBar,
  'sm:shadow-md': route.meta.hasFixedBar && isStuck.value,
}))
</script>

<template>
  <div
    ref="sentinel"
    class="h-0"
  />
  <header
    class="sm:top-0 sm:z-99 py-4 px-6 bg-white border-b border-b-gray-200"
    :class="classNames"
  >
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center">
        <h1 class="font-medium text-gray-900">
          {{ title }}
        </h1>
        <div class="flex items-center gap-4">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
  <main class="flex-1 py-4 px-6">
    <div class="max-w-4xl mx-auto">
      <slot name="default" />
    </div>
  </main>
</template>
