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
      class="flex flex-col items-center"
    >
      <span>Shirt: {{ designer.selectedColor?.name }}</span>
      <span>Design: {{ designer.selectedDesign?.name }}</span>
    </div>
  </div>
</template>
