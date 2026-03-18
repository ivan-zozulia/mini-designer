<script setup lang="ts">
const ctx = useListboxContext()

function onKeyDown(e: KeyboardEvent) {
  const nextKey = ctx.orientation.value === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
  const prevKey = ctx.orientation.value === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
  if (e.key === nextKey) {
    e.preventDefault()
    ctx.isKeyboardNav.value = true
    ctx.selectNext()
  }
  else if (e.key === prevKey) {
    e.preventDefault()
    ctx.isKeyboardNav.value = true
    ctx.selectPrev()
  }
}

function onFocus(e: FocusEvent) {
  ctx.isKeyboardNav.value = (e.target as HTMLDivElement).matches(':focus-visible') ?? false
}

function onBlur() {
  ctx.isKeyboardNav.value = false
}
</script>

<template>
  <div
    role="listbox"
    :aria-label="ctx.label.value"
    tabindex="0"
    class="flex outline-none"
    :class="ctx.orientation.value === 'horizontal' ? 'flex-row' : 'flex-col'"
    @keydown="onKeyDown"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </div>
</template>
