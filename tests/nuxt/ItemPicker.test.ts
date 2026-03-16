import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ItemPicker from '~/components/ItemPicker.vue'

describe('ItemPicker', () => {
  const items = ['A', 'B', 'C']

  it('emits select event on item click', async () => {
    const wrapper = await mountSuspended(ItemPicker, {
      props: { items, selectedIndex: 0 },
    })

    const buttons = wrapper.findAll('[data-testid="picker-item"]')
    await buttons[1]?.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual([1])
  })

  it('highlights selected item', async () => {
    const wrapper = await mountSuspended(ItemPicker, {
      props: { items, selectedIndex: 1 },
    })

    const buttons = wrapper.findAll('[data-testid="picker-item"]')
    expect(buttons[0]?.attributes('aria-selected')).toBe('false')
    expect(buttons[1]?.attributes('aria-selected')).toBe('true')
  })

  it('disables up arrow when at top', async () => {
    const wrapper = await mountSuspended(ItemPicker, {
      props: { items, selectedIndex: 0 },
    })

    const upButton = wrapper.find('[data-testid="scroll-up"]')
    expect(upButton.attributes('disabled')).toBeDefined()
  })

  it('disables down arrow when at bottom', async () => {
    const wrapper = await mountSuspended(ItemPicker, {
      props: { items, selectedIndex: 2 },
    })

    const downButton = wrapper.find('[data-testid="scroll-down"]')
    expect(downButton.attributes('disabled')).toBeDefined()
  })

  it('renders no items and disables both arrows when items is empty', async () => {
    const wrapper = await mountSuspended(ItemPicker, {
      props: { items: [], selectedIndex: 0 },
    })

    expect(wrapper.findAll('[data-testid="picker-item"]')).toHaveLength(0)
    expect(wrapper.find('[data-testid="scroll-up"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[data-testid="scroll-down"]').attributes('disabled')).toBeDefined()
  })
})
