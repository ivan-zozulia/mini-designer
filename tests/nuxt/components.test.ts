import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader', () => {
  it('renders title', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      props: { title: 'Test Title' },
    })

    expect(wrapper.find('h1').text()).toBe('Test Title')
  })
})
