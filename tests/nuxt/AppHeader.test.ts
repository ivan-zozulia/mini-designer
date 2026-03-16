import { mountSuspended } from '@nuxt/test-utils/runtime'
import { expect, it } from 'vitest'
import AppHeader from '~/components/AppHeader.vue'

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
