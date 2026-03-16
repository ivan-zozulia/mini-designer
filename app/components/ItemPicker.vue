<script setup lang="ts" generic="T">
const { items, selectedIndex } = defineProps<{
  items: T[]
  selectedIndex: number
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

const visibleCount = 4
const offset = ref(0)

const visibleItems = computed(() => items.slice(offset.value, offset.value + visibleCount))
const canScrollUp = computed(() => offset.value > 0)
const canScrollDown = computed(() => offset.value + visibleCount < items.length)

function scrollUp() {
  if (canScrollUp.value) {
    offset.value--
  }
}

function scrollDown() {
  if (canScrollDown.value) {
    offset.value++
  }
}
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <button
      data-testid="scroll-up"
      aria-label="Scroll up"
      type="button"
      :disabled="!canScrollUp"
      class="text-emerald-500 disabled:text-gray-300 transition-colors"
      @click="scrollUp"
    >
      <IconChevronUp class="size-8" />
    </button>
    <div class="flex flex-col gap-3">
      <button
        v-for="(item, i) in visibleItems"
        :key="offset + i"
        data-testid="picker-item"
        type="button"
        :aria-selected="offset + i === selectedIndex"
        class="rounded-lg border-2 p-1 transition-colors"
        :class="offset + i === selectedIndex ? 'border-emerald-400' : 'border-transparent'"
        @click="emit('select', offset + i)"
      >
        <slot
          :item="item"
          :index="offset + i"
        />
      </button>
    </div>
    <button
      data-testid="scroll-down"
      aria-label="Scroll down"
      type="button"
      :disabled="!canScrollDown"
      class="text-emerald-500 disabled:text-gray-300 transition-colors"
      @click="scrollDown"
    >
      <IconChevronDown class="size-8" />
    </button>
  </div>
</template>
