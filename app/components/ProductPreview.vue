<script setup lang="ts">
const designer = useDesignerStore()
</script>

<template>
  <div class="flex flex-col items-center">
    <TShirt
      v-if="designer.selectedColor && designer.selectedDesign"
      :color="designer.selectedColor.color"
      :design-img="designer.selectedDesign.img"
      :design-name="designer.selectedDesign.name"
    />
    <div
      class="flex flex-col gap-1 items-center text-gray-900 mt-4"
    >
      <div class="inline-flex gap-1">
        <span class="font-medium">Shirt:</span>
        <span>{{ designer.selectedColor?.name }}</span>
      </div>
      <div class="inline-flex gap-1">
        <span class="font-medium">Design:</span>
        <span>{{ designer.selectedDesign?.name }}</span>
      </div>
    </div>
  </div>
</template>
