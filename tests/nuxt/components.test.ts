import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppHeader from '~/components/AppHeader.vue'
import ItemPicker from '~/components/ItemPicker.vue'
import TShirt from '~/components/TShirt.vue'

describe('AppHeader', () => {
  it('renders title', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      props: { title: 'Test Title' },
    })

    expect(wrapper.find('h1').text()).toBe('Test Title')
  })

  it('renders slot content', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      props: { title: 'Title' },
      slots: { default: '<button>Action</button>' },
    })

    expect(wrapper.find('button').text()).toBe('Action')
  })
})

describe('TShirt', () => {
  it('applies the given color', async () => {
    const wrapper = await mountSuspended(TShirt, {
      props: { color: '#ff0000' },
    })

    expect(wrapper.element.style.color).toBe('#ff0000')
  })

  it('renders design image when provided', async () => {
    const wrapper = await mountSuspended(TShirt, {
      props: { color: '#ff0000', designImg: 'https://example.com/cat.png' },
    })

    const img = wrapper.find('[alt="Design"]')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/cat.png')
  })

  it('does not render design image when not provided', async () => {
    const wrapper = await mountSuspended(TShirt, {
      props: { color: '#ff0000' },
    })

    expect(wrapper.find('[alt="Design"]').exists()).toBe(false)
  })
})

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
})
