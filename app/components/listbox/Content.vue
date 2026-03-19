<script setup lang="ts">
const ctx = useListboxContext()

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    ctx.isKeyboardNav.value = true
    ctx.selectNext()
  }
  else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
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
    class="flex outline-none flex-row sm:flex-col"
    @keydown="onKeyDown"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </div>
</template>
