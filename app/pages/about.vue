<script setup lang="ts">
const router = useRouter()

function goBack() {
  const hasPreviousRoute = router.options.history.state.back
  if (hasPreviousRoute) {
    router.back()
  }
  else {
    navigateTo('/')
  }
}
</script>

<template>
  <div>
    <AppHeader title="About this Project">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-2 rounded-full transition-colors"
        @click="goBack"
      >
        Back
      </button>
    </AppHeader>
    <main class="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 class="text-3xl md:text-4xl font-light tracking-wide text-gray-500">
        This is a Demo Page
      </h2>
    </main>
  </div>
</template>
