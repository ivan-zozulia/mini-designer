<script setup lang="ts">
useSeoMeta({ title: 'About', description: 'Learn more about Mini Designer' })

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
  <PageContent title="About this Project">
    <template #actions>
      <button
        class="btn-secondary"
        @click="goBack"
      >
        Back
      </button>
    </template>
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 class="text-3xl md:text-4xl font-light tracking-wide text-gray-500">
        This is a Demo Page
      </h2>
    </div>
  </PageContent>
</template>
