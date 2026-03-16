import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
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

  describe('when focus on listbox', () => {
    const items = ['A', 'B', 'C', 'D', 'E', 'F']
    let wrapper: VueWrapper
    let listbox: DOMWrapper<Element>
    let options: DOMWrapper<Element>[]

    beforeEach(async () => {
      wrapper = await mountSuspended(ItemPicker, {
        props: { items, modelValue: 0 },
      })
      listbox = wrapper.find('[role=listbox]')
      options = wrapper.findAll('[role=option]')
      await listbox.trigger('focus')
    })

    it('should highlight selected item on focus', () => {
      expect(options[0]?.attributes('data-highlighted')).toBe('')
    })

    it('should select item when clicked', async () => {
      await options[2]?.trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })

    it('should navigate and select with arrows and Enter', async () => {
      await listbox.trigger('keydown', { key: 'ArrowDown' })
      await listbox.trigger('keydown', { key: 'ArrowDown' })
      await listbox.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    })
  })
})
