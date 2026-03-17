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
    class="flex items-center justify-between px-8 py-5 bg-white  sm:top-0 sm:z-99"
    :class="classNames"
  >
    <h1 class="text-3xl font-semibold text-emerald-700">
      {{ title }}
    </h1>
    <div class="flex items-center gap-4">
      <slot />
    </div>
  </header>
</template>
