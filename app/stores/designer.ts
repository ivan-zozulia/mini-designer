import type { Color, Design } from '~/types'

export const useDesignerStore = defineStore('designer', () => {
  const colors = shallowRef<Color[]>([])
  const designs = shallowRef<Design[]>([])
  const selectedColorIndex = ref(0)
  const selectedDesignIndex = ref(0)

  const selectedColor = computed(() => colors.value[selectedColorIndex.value])
  const selectedDesign = computed(() => designs.value[selectedDesignIndex.value])

  const totalPrice = computed(() => {
    const colorPrice = selectedColor.value?.price ?? 0
    const designPrice = selectedDesign.value?.price ?? 0
    return colorPrice + designPrice
  })

  async function fetchData() {
    const [colorsData, designsData] = await Promise.all([
      $fetch<Color[]>('/api/colors'),
      $fetch<Design[]>('/api/motives'),
    ])
    colors.value = colorsData.map(c => ({ ...c, price: Math.round(c.price * 100) }))
    designs.value = designsData.map(m => ({ ...m, price: Math.round(m.price * 100) }))
    selectedColorIndex.value = 0
    selectedDesignIndex.value = 0
  }

  function $reset() {
    selectedColorIndex.value = 0
    selectedDesignIndex.value = 0
  }

  return {
    colors,
    designs,
    selectedColorIndex,
    selectedDesignIndex,
    selectedColor,
    selectedDesign,
    totalPrice,
    fetchData,
    $reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDesignerStore, import.meta.hot))
}
