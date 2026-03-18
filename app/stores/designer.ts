import type { Color, Design } from '~/types'

export const useDesignerStore = defineStore('designer', () => {
  const colors = shallowRef<Color[]>([])
  const designs = shallowRef<Design[]>([])
  const selectedColor = ref<Color>()
  const selectedDesign = ref<Design>()

  const totalPrice = computed(() => {
    const colorPrice = selectedColor.value?.price ?? 0
    const designPrice = selectedDesign.value?.price ?? 0
    return colorPrice + designPrice
  })

  async function fetchData() {
    try {
      const [colorsData, designsData] = await Promise.all([
        $fetch<Color[]>('/api/colors'),
        $fetch<Design[]>('/api/motives'),
      ])
      colors.value = colorsData.map(c => ({ ...c, price: Math.round(c.price * 100) }))
      designs.value = designsData.map(m => ({ ...m, price: Math.round(m.price * 100) }))
      selectedColor.value = colors.value[0]
      selectedDesign.value = designs.value[0]
    }
    catch {
      throw createError({ status: 500, message: 'Failed to load design data' })
    }
  }

  function $reset() {
    selectedColor.value = colors.value[0]
    selectedDesign.value = designs.value[0]
  }

  return {
    colors,
    designs,
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
