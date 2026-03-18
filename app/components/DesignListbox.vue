<script setup lang="ts" generic="T">
const { items, label, orientation = 'vertical', visibleCount = 4 } = defineProps<{
  items: T[]
  label: string
  orientation?: 'vertical' | 'horizontal'
  visibleCount?: number
}>()

defineSlots<{
  default(props: { item: T }): void
}>()

const modelValue = defineModel<T>({ required: true })
</script>

<template>
  <ListboxRoot
    v-model="modelValue"
    :label="label"
    :orientation="orientation"
    :visible-count="visibleCount"
    class="items-center gap-2"
  >
    <ListboxPrev class="text-emerald-500 disabled:text-gray-300 transition-colors">
      <IconChevronUp
        class="size-8"
        :class="orientation === 'horizontal' ? '-rotate-90' : ''"
      />
    </ListboxPrev>
    <ListboxContent>
      <ListboxItem
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        class="group size-12 flex items-center justify-center rounded-lg cursor-pointer data-highlighted:ring-2"
      >
        <slot :item="item" />
      </ListboxItem>
    </ListboxContent>
    <ListboxNext class="text-emerald-500 disabled:text-gray-300 transition-colors">
      <IconChevronDown
        class="size-8"
        :class="orientation === 'horizontal' ? '-rotate-90' : ''"
      />
    </ListboxNext>
  </ListboxRoot>
</template>
