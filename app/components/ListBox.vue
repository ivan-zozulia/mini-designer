<script setup lang="ts" generic="T extends { name: string }">
const { items, orientation = 'vertical', visibleCount = 4, label } = defineProps<{
  items: T[]
  orientation?: 'vertical' | 'horizontal'
  visibleCount?: number
  label: string
}>()

defineSlots<{
  default(props: { item: T }): void
}>()

const selected = defineModel<number>({ required: true })
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

function selectNext() {
  if (highlightedIndex.value < items.length - 1) {
    highlightedIndex.value++
    selected.value = highlightedIndex.value
    ensureVisible(highlightedIndex.value)
  }
}

function selectPrev() {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
    selected.value = highlightedIndex.value
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
  const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'

  if (e.key === nextKey) {
    e.preventDefault()
    selectNext()
  }
  else if (e.key === prevKey) {
    e.preventDefault()
    selectPrev()
  }
}

function selectItem(index: number) {
  selected.value = index
  highlightedIndex.value = index
}
</script>

<template>
  <div
    class="flex items-center gap-2"
    :class="orientation === 'horizontal' ? 'flex-row' : 'flex-col'"
  >
    <button
      data-testid="scroll-prev"
      aria-label="Scroll to previous"
      type="button"
      :disabled="!canScrollPrev"
      class="text-emerald-500 disabled:text-gray-300 transition-colors"
      tabindex="-1"
      @click="offset--"
    >
      <IconChevronUp
        class="size-8"
        :class="orientation === 'horizontal' ? '-rotate-90' : ''"
      />
    </button>
    <div
      role="listbox"
      :aria-label="label"
      tabindex="0"
      class="flex gap-3 outline-none"
      :class="orientation === 'horizontal' ? 'flex-row' : 'flex-col'"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
    >
      <div
        v-for="(item, i) in visibleItems"
        :key="offset + i"
        role="option"
        :aria-label="item.name"
        :aria-selected="offset + i === selected"
        :data-highlighted="highlightedIndex === offset + i ? '' : undefined"
        class="rounded-lg border-2 p-1 cursor-pointer data-highlighted:ring-2 data-highlighted:ring-emerald-300"
        :class="offset + i === selected ? 'border-emerald-400' : 'border-transparent'"
        @click="selectItem(offset + i)"
      >
        <slot :item="item" />
      </div>
    </div>
    <button
      data-testid="scroll-next"
      aria-label="Scroll to next"
      type="button"
      :disabled="!canScrollNext"
      class="text-emerald-500 disabled:text-gray-300"
      tabindex="-1"
      @click="offset++"
    >
      <IconChevronDown
        class="size-8"
        :class="orientation === 'horizontal' ? '-rotate-90' : ''"
      />
    </button>
  </div>
</template>
