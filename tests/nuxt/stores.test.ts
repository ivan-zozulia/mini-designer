import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { useDesignerStore } from '~/stores/designer'
import type { Color, Motive } from '~/types'

const mockColors = [
  { name: 'Red', color: '#ff0000', price: 1050 },
  { name: 'Green', color: '#00ff00', price: 1225 },
  { name: 'Blue', color: '#0000ff', price: 1500 },
] as const satisfies Color[]

const mockMotives = [
  { name: 'Cat', img: 'https://example.com/cat.png', price: 500 },
  { name: 'Dog', img: 'https://example.com/dog.png', price: 850 },
] as const satisfies Motive[]

registerEndpoint('/api/colors', () =>
  mockColors.map(c => ({ ...c, price: c.price / 100 })),
)
registerEndpoint('/api/motives', () =>
  mockMotives.map(m => ({ ...m, price: m.price / 100 })),
)

describe('Designer store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches and sets colors and motives', async () => {
    const store = useDesignerStore()
    await store.fetchData()

    expect(store.colors).toEqual(mockColors)
    expect(store.motives).toEqual(mockMotives)
  })

  it('selects a different color', async () => {
    const store = useDesignerStore()
    await store.fetchData()

    store.selectedColorIndex = 2

    expect(store.selectedColor).toEqual(mockColors[2])
  })

  it('selects a different motive', async () => {
    const store = useDesignerStore()
    await store.fetchData()

    store.selectedMotiveIndex = 1

    expect(store.selectedMotive).toEqual(mockMotives[1])
  })

  it('updates total price when selection change', async () => {
    const store = useDesignerStore()
    await store.fetchData()

    expect(store.totalPrice).toBe(mockColors[0].price + mockMotives[0].price)

    store.selectedColorIndex = 1
    expect(store.totalPrice).toBe(mockColors[1].price + mockMotives[0].price)

    store.selectedMotiveIndex = 1
    expect(store.totalPrice).toBe(mockColors[1].price + mockMotives[1].price)
  })

  it('resets selection to first items', async () => {
    const store = useDesignerStore()
    await store.fetchData()

    store.selectedColorIndex = 2
    store.selectedMotiveIndex = 1
    store.$reset()

    expect(store.selectedColor).toEqual(mockColors[0])
    expect(store.selectedMotive).toEqual(mockMotives[0])
  })

  it('has no selected color or motive before data is fetched', () => {
    const store = useDesignerStore()

    expect(store.selectedColor).toBeUndefined()
    expect(store.selectedMotive).toBeUndefined()
  })

  it('returns 0 for totalPrice when data is empty', () => {
    const store = useDesignerStore()

    expect(store.totalPrice).toBe(0)
  })
})
