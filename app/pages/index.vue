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
  <PageContent title="Design your Shirt">
    <template #actions>
      <div class="fixed sm:static z-100 right-0 bottom-0 left-0 flex items-center justify-between gap-4 h-16 sm:h-auto px-4 sm:px-0 shadow-[0_-4px_6px_0_rgba(0,0,0,0.05)] sm:shadow-none bg-white sm:bg-transparent">
        <span class="text-xl font-semibold tabular-nums">{{
          formatCurrency(designer.totalPrice)
        }}</span>
        <NuxtLink
          to="/checkout"
          class="btn-primary"
        >
          Checkout
        </NuxtLink>
      </div>
    </template>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 sm:p-8">
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
      <ProductPreview class="flex-1 max-w-md order-1 sm:order-2" />
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
            <DesignPreview
              :name="item.name"
              :img="item.img"
            />
          </template>
        </DesignListbox>
      </div>
    </div>
  </PageContent>
</template>
