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
        @click="goBack"
      >
        Back
      </button>
    </AppHeader>

    <main>
      <h2>
        This is a Demo Page
      </h2>
    </main>
  </div>
</template>
