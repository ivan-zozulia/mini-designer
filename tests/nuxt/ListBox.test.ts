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
  let wrapper: VueWrapper
  let listbox: DOMWrapper<Element>
  let options: DOMWrapper<Element>[]

  beforeEach(async () => {
    wrapper = await mountSuspended(createListbox(items))
    listbox = wrapper.find('[role=listbox]')
    options = wrapper.findAll('[role=option]')
    await listbox.trigger('focus')
  })

  it('should select item when clicked', async () => {
    await options[2]?.trigger('click')
    expect(wrapper.findAll('[role=option]')[2]?.attributes('data-selected')).toBeDefined()
  })

  it('should select on arrow key', async () => {
    await listbox.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.findAll('[role=option]')[1]?.attributes('data-selected')).toBeDefined()
  })
})

describe('Horizontal Listbox', () => {
  it('should navigate with right and left arrows', async () => {
    const items = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }, { name: 'F' }]
    const wrapper = await mountSuspended(createListbox(items, { orientation: 'horizontal' }))
    const listbox = wrapper.find('[role=listbox]')
    await listbox.trigger('focus')
    await listbox.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.findAll('[role=option]')[1]?.attributes('data-selected')).toBeDefined()
  })
})
