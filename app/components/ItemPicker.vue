<script setup lang="ts" generic="T">
const { items } = defineProps<{
  items: T[]
}>()

const selected = defineModel<number>({ required: true })

const visibleCount = 4
const offset = ref(0)
const highlightedIndex = ref(-1)

const visibleItems = computed(() => items.slice(offset.value, offset.value + visibleCount))
const canScrollPrev = computed(() => offset.value > 0)
const canScrollNext = computed(() => offset.value + visibleCount < items.length)

function ensureVisible(index: number) {
  if (index < offset.value) {
    offset.value = index
  }
  else if (index >= offset.value + visibleCount) {
    offset.value = index - visibleCount + 1
  }
}

function highlightNext() {
  if (highlightedIndex.value < items.length - 1) {
    highlightedIndex.value++
    ensureVisible(highlightedIndex.value)
  }
}

function highlightPrev() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
    ensureVisible(highlightedIndex.value)
  }
}

function onFocus() {
  if (highlightedIndex.value === -1) {
    highlightedIndex.value = selected.value
  }
}

function onBlur() {
  highlightedIndex.value = -1
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    highlightNext()
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    highlightPrev()
  }
  else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (highlightedIndex.value >= 0) {
      selected.value = highlightedIndex.value
    }
  }
}

function selectItem(index: number) {
  selected.value = index
  highlightedIndex.value = index
}
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
    <div
      role="listbox"
      class="flex flex-col gap-3"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, i) in visibleItems"
        :key="offset + i"
        role="option"
        data-testid="picker-item"
        :aria-selected="offset + i === selected"
        :data-highlighted="highlightedIndex === offset + i ? '' : undefined"
        class="rounded-lg border-2 p-1 transition-colors cursor-pointer"
        :class="offset + i === selected ? 'border-emerald-400' : 'border-transparent'"
        @click="selectItem(offset + i)"
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
