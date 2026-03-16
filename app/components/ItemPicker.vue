<script setup lang="ts" generic="T">
const { items } = defineProps<{
  items: T[]
}>()

const selected = defineModel<number>({ required: true })

const visibleCount = 4
const offset = ref(0)

const visibleItems = computed(() => items.slice(offset.value, offset.value + visibleCount))
const canScrollPrev = computed(() => offset.value > 0)
const canScrollNext = computed(() => offset.value + visibleCount < items.length)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <button
      data-testid="scroll-prev"
      aria-label="Scroll to previous"
      type="button"
      :disabled="!canScrollPrev"
      class="text-emerald-500 disabled:text-gray-300 transition-colors"
      tabindex="-1"
      @click="offset--"
    >
      <IconChevronUp class="size-8" />
    </button>
    <div class="flex flex-col gap-3">
      <div
        v-for="(item, i) in visibleItems"
        :key="offset + i"
        data-testid="picker-item"
        :aria-selected="offset + i === selected"
        class="rounded-lg border-2 p-1 transition-colors cursor-pointer"
        :class="offset + i === selected ? 'border-emerald-400' : 'border-transparent'"
        @click="selected = offset + i"
      >
        <slot
          :item="item"
          :index="offset + i"
        />
      </div>
    </div>
    <button
      data-testid="scroll-next"
      aria-label="Scroll to next"
      type="button"
      :disabled="!canScrollNext"
      class="text-emerald-500 disabled:text-gray-300 transition-colors"
      tabindex="-1"
      @click="offset++"
    >
      <IconChevronDown class="size-8" />
    </button>
  </div>
</template>
