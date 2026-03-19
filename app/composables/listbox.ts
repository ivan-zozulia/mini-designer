import type { ComputedRef, Ref } from 'vue'

export interface ListboxContext {
  label: ComputedRef<string>
  isKeyboardNav: Ref<boolean>
  canSelectPrev: ComputedRef<boolean>
  canSelectNext: ComputedRef<boolean>
  selectPrev: () => void
  selectNext: () => void
  registerItem: (value: unknown) => void
  unregisterItem: (value: unknown) => void
  onValueChange: (val: unknown) => void
  isVisible: (value: unknown) => boolean
  isSelected: (value: unknown) => boolean
  isHighlighted: (value: unknown) => boolean
  clearKeyboardNav: () => void
}

const LISTBOX_INJECTION_KEY = Symbol('listbox') as InjectionKey<ListboxContext>

export function provideListboxContext(context: ListboxContext) {
  provide(LISTBOX_INJECTION_KEY, context)
}

export function useListboxContext(): ListboxContext {
  const context = inject(LISTBOX_INJECTION_KEY)
  if (!context) {
    throw new Error('Listbox components must be used within a ListboxRoot')
  }
  return context
}
