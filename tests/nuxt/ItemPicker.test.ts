import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ItemPicker from '~/components/ItemPicker.vue'

describe('ItemPicker', () => {
  it('should render no items and disable both buttons when empty', async () => {
    const w = await mountSuspended(ItemPicker, {
      props: { items: [], modelValue: 0 },
    })
    expect(w.findAll('[data-testid="picker-item"]')).toHaveLength(0)
    expect(w.find('[data-testid="scroll-prev"]').attributes('disabled')).toBeDefined()
    expect(w.find('[data-testid="scroll-next"]').attributes('disabled')).toBeDefined()
  })

  it('should select item when clicked', async () => {
    const w = await mountSuspended(ItemPicker, {
      props: { items: ['A', 'B', 'C', 'D', 'E', 'F'], modelValue: 0 },
    })
    const options = w.findAll('[data-testid="picker-item"]')
    await options[2]?.trigger('click')
    expect(w.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})
