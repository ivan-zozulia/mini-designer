<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  id: string
  label: string
  errors?: string[]
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-semibold mb-1"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      class="w-full border rounded-lg px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors"
      :class="
        errors?.length
          ? 'border-red-500'
          : 'border-gray-300'
      "
    >
    <div
      v-if="errors?.length"
      aria-live="polite"
    >
      <p
        v-for="err in errors"
        :key="err"
        class="text-red-500 text-xs mt-1"
      >
        {{ err }}
      </p>
    </div>
  </div>
</template>
