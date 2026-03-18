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
    class="items-center"
  >
    <ListboxPrev class="size-12 flex items-center justify-center cursor-pointer text-gray-700 disabled:text-gray-300 disabled:cursor-default">
      <IconChevron
        class="size-4"
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
    <ListboxNext class="size-12 flex items-center justify-center cursor-pointer text-gray-700 disabled:text-gray-300 disabled:cursor-default">
      <IconChevron
        class="size-4"
        :class="orientation === 'horizontal' ? '-rotate-270' : '-rotate-180'"
      />
    </ListboxNext>
  </ListboxRoot>
</template>
