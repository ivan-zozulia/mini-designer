import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ListBox from '~/components/ListBox.vue'

describe('given empty ListBox', () => {
  it('should render no items and disable both buttons', async () => {
    const wrapper = await mountSuspended(ListBox, {
      props: { items: [], modelValue: 0 },
    })
    expect(wrapper.findAll('[role=option]')).toHaveLength(0)
    expect(wrapper.find('[data-testid="scroll-prev"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[data-testid="scroll-next"]').attributes('disabled')).toBeDefined()
  })
})

describe('given vertical ListBox', () => {
  const items = ['A', 'B', 'C', 'D', 'E', 'F']
  let wrapper: VueWrapper
  let listbox: DOMWrapper<Element>
  let options: DOMWrapper<Element>[]

  beforeEach(async () => {
    wrapper = await mountSuspended(ListBox, {
      props: { items, modelValue: 0 },
    })
    listbox = wrapper.find('[role=listbox]')
    options = wrapper.findAll('[role=option]')
    await listbox.trigger('focus')
  })

  it('should select item when clicked', async () => {
    await options[2]?.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('should highlight selected item on focus', () => {
    expect(options[0]?.attributes('data-highlighted')).toBe('')
  })

  it('should navigate and select with arrows and enter', async () => {
    await listbox.trigger('keydown', { key: 'ArrowDown' })
    await listbox.trigger('keydown', { key: 'ArrowDown' })
    await listbox.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})

describe('given horizontal ListBox', () => {
  it('should navigate with right and left arrows', async () => {
    const wrapper = await mountSuspended(ListBox, {
      props: { items: ['A', 'B', 'C', 'D', 'E', 'F'], modelValue: 0, orientation: 'horizontal' },
    })
    const listbox = wrapper.find('[role=listbox]')
    await listbox.trigger('focus')
    await listbox.trigger('keydown', { key: 'ArrowRight' })
    await listbox.trigger('keydown', { key: 'ArrowRight' })
    await listbox.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })
})
