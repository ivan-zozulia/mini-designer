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
      class="block text-sm leading-6 font-medium text-gray-600 after:content-['*'] after:ml-1 after:text-red-500"
    >{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      v-bind="$attrs"
      class="w-full mt-2 rounded-md px-3 py-2 outline-1 outline-gray-300 bg-white focus:outline-2 focus:-outline-offset-2 focus:outline-blue-700  aria-invalid:outline-red-500 aria-invalid:focus:outline-red-500"
      :aria-invalid="!!errors?.length"
      :aria-describedby="errors?.length ? `${id}-errors` : undefined"
    >
    <div
      v-if="errors?.length"
      :id="`${id}-errors`"
      aria-live="polite"
    >
      <p
        v-for="err in errors"
        :key="err"
        class="text-red-500 text-sm mt-2"
      >
        {{ err }}
      </p>
    </div>
  </div>
</template>
