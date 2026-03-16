<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div>
    <AppHeader title="Design your Shirt">
      <span class="text-xl font-semibold tabular-nums">{{
        formatCurrency(designer.totalPrice)
      }}</span>
      <NuxtLink
        to="/checkout"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition-colors"
      >
        Go to Checkout
      </NuxtLink>
    </AppHeader>
    <main class="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 p-4 md:p-8">
      <div class="shrink-0 order-2 md:order-1">
        <ItemPicker
          :items="designer.colors"
          :selected-index="designer.selectedColorIndex"
          @select="(i: number) => (designer.selectedColorIndex = i)"
        >
          <template #default="{ item }">
            <div
              class="size-12 rounded-full"
              :style="{ backgroundColor: item.color }"
            />
          </template>
        </ItemPicker>
      </div>
      <div class="flex-1 max-w-md mx-auto order-1 md:order-2">
        <TShirt
          v-if="designer.selectedColor && designer.selectedDesign"
          :color="designer.selectedColor.color"
          :design-img="designer.selectedDesign.img"
        />
      </div>
      <div class="shrink-0 order-3">
        <ItemPicker
          :items="designer.designs"
          :selected-index="designer.selectedDesignIndex"
          @select="(i: number) => (designer.selectedDesignIndex = i)"
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
        </ItemPicker>
      </div>
    </main>
  </div>
</template>
