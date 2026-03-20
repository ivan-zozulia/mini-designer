<script setup lang="ts" generic="T">
const {
  visibleCount = 4,
  label,
  by,
} = defineProps<{
  visibleCount?: number
  label: string
  by?: (string & keyof T) | ((a: T, b: T) => boolean)
}>()

const modelValue = defineModel<T>({ required: true })
const offset = ref(0)
const isKeyboardNav = ref(false)
const registeredValues = shallowRef<unknown[]>([])

function isEqual(a: unknown, b: unknown): boolean {
  if (!by) {
    return toRaw(a) === toRaw(b)
  }
  if (typeof by === 'string') {
    return (a as T)[by] === (b as T)[by]
  }
  return by(a as T, b as T)
}

const canSelectPrev = computed(() => offset.value > 0)
const canSelectNext = computed(() => offset.value + visibleCount < registeredValues.value.length)

function indexOf(value: unknown) {
  return registeredValues.value.findIndex(v => isEqual(v, value))
}

function ensureVisible(index: number) {
  if (index < offset.value) {
    offset.value = index
  }
  else if (index >= offset.value + visibleCount) {
    offset.value = index - visibleCount + 1
  }
}

function selectAt(index: number) {
  const val = registeredValues.value[index]
  if (val !== undefined) {
    modelValue.value = val as T
    ensureVisible(index)
  }
}

function selectNext() {
  const currentIdx = indexOf(modelValue.value)
  if (currentIdx < registeredValues.value.length - 1) {
    selectAt(currentIdx + 1)
  }
}

function selectPrev() {
  const currentIdx = indexOf(modelValue.value)
  if (currentIdx > 0) {
    selectAt(currentIdx - 1)
  }
}

function registerItem(value: unknown) {
  registeredValues.value = [...registeredValues.value, value]
}

function unregisterItem(value: unknown) {
  registeredValues.value = registeredValues.value.filter(v => !isEqual(v, value))
}

function onValueChange(val: unknown) {
  modelValue.value = val as T
}

function isVisible(value: unknown) {
  const idx = indexOf(value)
  return idx >= offset.value && idx < offset.value + visibleCount
}

function isSelected(value: unknown) {
  return isEqual(modelValue.value, value)
}

function isHighlighted(value: unknown) {
  return isSelected(value) && isKeyboardNav.value
}

function clearKeyboardNav() {
  isKeyboardNav.value = false
}

onMounted(() => {
  const idx = indexOf(modelValue.value)
  if (idx > 0) {
    ensureVisible(idx)
  }
})

provideListboxContext({
  label: computed(() => label),
  isKeyboardNav,
  canSelectPrev,
  canSelectNext,
  selectPrev,
  selectNext,
  registerItem,
  unregisterItem,
  onValueChange,
  isVisible,
  isSelected,
  isHighlighted,
  clearKeyboardNav,
})
</script>

<template>
  <div
    class="flex flex-row sm:flex-col"
  >
    <slot />
  </div>
</template>
