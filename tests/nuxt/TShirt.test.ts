import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import TShirt from '~/components/TShirt.vue'

it('applies the given color', async () => {
  const wrapper = await mountSuspended(TShirt, {
    props: { color: '#FF0000', designName: 'Cat' },
  })

  expect(wrapper.element.style.getPropertyValue('--base-color')).toBe('#FF0000')
})

it('renders design image when provided', async () => {
  const wrapper = await mountSuspended(TShirt, {
    props: { color: '#ff0000', designImg: 'https://example.com/cat.png', designName: 'Cat' },
  })

  const img = wrapper.find('img')
  expect(img.exists()).toBe(true)
  expect(img.attributes('src')).toBe('https://example.com/cat.png')
  expect(img.attributes('alt')).toBe('Cat')
})

it('does not render design image when not provided', async () => {
  const wrapper = await mountSuspended(TShirt, {
    props: { color: '#ff0000', designName: 'Cat' },
  })

  expect(wrapper.find('img').exists()).toBe(false)
})
