import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ListboxRoot from '~/components/listbox/Root.vue'
import ListboxPrev from '~/components/listbox/Prev.vue'
import ListboxNext from '~/components/listbox/Next.vue'
import ListboxContent from '~/components/listbox/Content.vue'
import ListboxItem from '~/components/listbox/Item.vue'

function createListbox(items: { name: string }[], props: Record<string, unknown> = {}) {
  return {
    components: { ListboxRoot, ListboxPrev, ListboxNext, ListboxContent, ListboxItem },
    template: `
      <ListboxRoot v-model="selected" label="Test" v-bind="extraProps">
        <ListboxPrev />
        <ListboxContent>
          <ListboxItem v-for="item in items" :key="item.name" :value="item">
            {{ item.name }}
          </ListboxItem>
        </ListboxContent>
        <ListboxNext />
      </ListboxRoot>
    `,
    setup() {
      const selected = ref(props.modelValue ?? items[0])
      return { selected, items, extraProps: props }
    },
  }
}

describe('Empty Listbox', () => {
  it('should render no items and disable both buttons', async () => {
    const wrapper = await mountSuspended({
      components: { ListboxRoot, ListboxPrev, ListboxNext, ListboxContent, ListboxItem },
      template: `
        <ListboxRoot v-model="selected" label="Test">
          <ListboxPrev />
          <ListboxContent>
          </ListboxContent>
          <ListboxNext />
        </ListboxRoot>
      `,
      setup() {
        const selected = ref(undefined)
        return { selected }
      },
    })
    expect(wrapper.findAll('[role=option]')).toHaveLength(0)
    expect(wrapper.find('[data-testid="select-prev"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('[data-testid="select-next"]').attributes('disabled')).toBeDefined()
  })
})

describe('Vertical Listbox', () => {
  const items = [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
    { name: 'E' },
    { name: 'F' },
  ]
  const visibleCount = 4
  let wrapper: VueWrapper
  let listbox: DOMWrapper<Element>
  let options: DOMWrapper<Element>[]
  let prev: DOMWrapper<Element>
  let next: DOMWrapper<Element>

  beforeEach(async () => {
    wrapper = await mountSuspended(createListbox(items, { visibleCount }))
    listbox = wrapper.find('[role=listbox]')
    options = wrapper.findAll('[role=option]')
    next = wrapper.find('[data-testid="select-next"]')
    prev = wrapper.find('[data-testid="select-prev"]')
    await listbox.trigger('focus')
  })

  it('should disable prev at start', async () => {
    expect(prev.attributes('disabled')).toBeDefined()
  })

  it('should enable prev after scrolling forward', async () => {
    for (let i = 0; i < visibleCount; i++) {
      await next.trigger('click')
    }
    expect(prev.attributes('disabled')).toBeUndefined()
  })

  it('should select previous item when prev is clicked', async () => {
    for (let i = 0; i < visibleCount; i++) {
      await next.trigger('click')
    }
    expect(prev.attributes('disabled')).toBeUndefined()
    await prev.trigger('click')
    expect(options[3]?.attributes('data-selected')).toBeDefined()
  })

  it('should select next item when next is clicked', async () => {
    await next.trigger('click')
    expect(options[1]?.attributes('data-selected')).toBeDefined()
  })

  it('should disable next when offset is at end', async () => {
    for (let i = 0; i < items.length - 1; i++) {
      await next.trigger('click')
    }
    expect(next.attributes('disabled')).toBeDefined()
  })

  it('should enable next after scrolling back', async () => {
    for (let i = 0; i < items.length - 1; i++) {
      await next.trigger('click')
    }
    expect(next.attributes('disabled')).toBeDefined()
    for (let i = 0; i < visibleCount; i++) {
      await prev.trigger('click')
    }
    expect(next.attributes('disabled')).toBeUndefined()
  })

  it('should select item when clicked', async () => {
    await options[2]?.trigger('click')
    expect(options[2]?.attributes('data-selected')).toBeDefined()
  })

  it('should select items with arrow keys', async () => {
    await listbox.trigger('keydown', { key: 'ArrowDown' })
    expect(options[1]?.attributes('data-selected')).toBeDefined()

    await listbox.trigger('keydown', { key: 'ArrowRight' })
    expect(options[2]?.attributes('data-selected')).toBeDefined()

    await listbox.trigger('keydown', { key: 'ArrowUp' })
    expect(options[1]?.attributes('data-selected')).toBeDefined()

    await listbox.trigger('keydown', { key: 'ArrowLeft' })
    expect(options[0]?.attributes('data-selected')).toBeDefined()
  })
})
