import type { Color, Motive } from '~/types'

export const useDesignerStore = defineStore('designer', () => {
  const colors = shallowRef<Color[]>([])
  const motives = shallowRef<Motive[]>([])
  const selectedColorIndex = ref(0)
  const selectedMotiveIndex = ref(0)

  const selectedColor = computed(() => colors.value[selectedColorIndex.value])
  const selectedMotive = computed(() => motives.value[selectedMotiveIndex.value])

  const totalPrice = computed(() => {
    const colorPrice = selectedColor.value?.price ?? 0
    const motivePrice = selectedMotive.value?.price ?? 0
    return colorPrice + motivePrice
  })

  async function fetchData() {
    const [colorsData, motivesData] = await Promise.all([
      $fetch<Color[]>('/api/colors'),
      $fetch<Motive[]>('/api/motives'),
    ])
    colors.value = colorsData.map(c => ({ ...c, price: Math.round(c.price * 100) }))
    motives.value = motivesData.map(m => ({ ...m, price: Math.round(m.price * 100) }))
    selectedColorIndex.value = 0
    selectedMotiveIndex.value = 0
  }

  function $reset() {
    selectedColorIndex.value = 0
    selectedMotiveIndex.value = 0
  }

  return {
    colors,
    motives,
    selectedColorIndex,
    selectedMotiveIndex,
    selectedColor,
    selectedMotive,
    totalPrice,
    fetchData,
    $reset,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDesignerStore, import.meta.hot))
}
