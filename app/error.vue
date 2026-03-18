<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const errorCodes: Record<number, string> = {
  404: 'Page not found',
}

const defaultMessage = 'Something went wrong'

const message = (error.status && errorCodes[error.status]) ?? error.message ?? defaultMessage

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center space-y-4">
      <h1 class="text-6xl font-bold text-gray-300">
        Error
      </h1>
      <p class="text-lg text-gray-600">
        {{ message }}
      </p>
      <button
        class="btn-primary"
        @click="handleError"
      >
        Back to home
      </button>
    </div>
  </div>
</template>
