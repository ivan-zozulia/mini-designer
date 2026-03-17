<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

useHead({ title: 'Design your Shirt' })

const designer = useDesignerStore()

const isMobile = useMediaQuery('(max-width: 767px)')
const orientation = computed(() => isMobile.value ? 'horizontal' : 'vertical')
const visibleCount = computed(() => isMobile.value ? 3 : 4)
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <span class="text-xl font-semibold tabular-nums">{{
        formatCurrency(designer.totalPrice)
      }}</span>
      <NuxtLink
        to="/checkout"
        class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:outline-none text-white font-semibold px-6 py-2 rounded-full transition-colors"
      >
        Go to Checkout
      </NuxtLink>
    </AppHeader>
    <main class="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 p-4 md:p-8">
      <div class="shrink-0 order-2 md:order-1">
        <ListBox
          v-model="designer.selectedColorIndex"
          :items="designer.colors"
          :orientation="orientation"
          :visible-count="visibleCount"
        >
          <template #default="{ item }">
            <div
              class="size-12 rounded-full"
              :style="{ backgroundColor: item.color }"
            />
          </template>
        </ListBox>
      </div>
      <div class="flex-1 max-w-md mx-auto order-1 md:order-2">
        <TShirt
          v-if="designer.selectedColor && designer.selectedDesign"
          :color="designer.selectedColor.color"
          :design-img="designer.selectedDesign.img"
        />
      </div>
      <div class="shrink-0 order-3">
        <ListBox
          v-model="designer.selectedDesignIndex"
          :items="designer.designs"
          :orientation="orientation"
          :visible-count="visibleCount"
        >
          <template #default="{ item }">
            <img
              :src="item.img"
              :alt="item.name"
              width="48"
              height="48"
              class="size-12 object-cover rounded"
            >
          </template>
        </ListBox>
      </div>
    </main>
  </div>
</template>
