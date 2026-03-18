<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

useSeoMeta({ title: 'Design your Shirt', description: 'Design Unix Classic Tee for yourself' })

const designer = useDesignerStore()

const isCompact = useMediaQuery('(max-width: 639px)', {
  ssrWidth: 640,
})

definePageMeta({
  hasFixedBar: true,
})

const orientation = computed(() => isCompact.value ? 'horizontal' : 'vertical')
const visibleCount = computed(() => isCompact.value ? 3 : 4)
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <div class="fixed sm:static z-100 right-0 bottom-0 left-0 flex items-center justify-between gap-4 h-16 px-4 shadow-[0_-4px_6px_0_rgba(0,0,0,0.05)] sm:shadow-none bg-white sm:bg-transparent">
        <span class="text-xl font-semibold tabular-nums">{{
          formatCurrency(designer.totalPrice)
        }}</span>
        <NuxtLink
          to="/checkout"
          class="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none text-white font-semibold px-6 py-2 rounded-full transition-colors"
        >
          Checkout
        </NuxtLink>
      </div>
    </AppHeader>
    <main class="flex-1 flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-8">
      <div class="shrink-0 order-2 md:order-1">
        <DesignListbox
          v-if="designer.selectedColor"
          v-model="designer.selectedColor"
          :items="designer.colors"
          label="Product color"
          :orientation="orientation"
          :visible-count="visibleCount"
        >
          <template #default="{ item }">
            <ColorSwatch
              :name="item.name"
              :color="item.color"
            />
          </template>
        </DesignListbox>
      </div>
      <div class="flex-1 max-w-md order-1 sm:order-2 flex flex-col items-center">
        <TShirt
          v-if="designer.selectedColor && designer.selectedDesign"
          :color="designer.selectedColor.color"
          :design-img="designer.selectedDesign.img"
          :design-name="designer.selectedDesign.name"
        />
        <div
          class="mt-4 text-sm font-semibold text-center lg:text-left"
        >
          <div>Shirt: {{ designer.selectedColor?.name }}</div>
          <div>Design: {{ designer.selectedDesign?.name }}</div>
        </div>
      </div>
      <div class="shrink-0 order-3">
        <DesignListbox
          v-if="designer.selectedDesign"
          v-model="designer.selectedDesign"
          :items="designer.designs"
          label="Product design"
          :orientation="orientation"
          :visible-count="visibleCount"
        >
          <template #default="{ item }">
            <div class="rounded-[11%/15%] p-0.5 border-2 border-transparent group-data-selected:border-blue-700">
              <img
                :src="item.img"
                :alt="item.name"
                width="36"
                height="27"
                class="block w-9 aspect-4/3 object-cover rounded-[11%/15%] border border-neutral-500"
              >
            </div>
          </template>
        </DesignListbox>
      </div>
    </main>
  </div>
</template>
