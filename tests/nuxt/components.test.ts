import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppHeader from '~/components/AppHeader.vue'
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
