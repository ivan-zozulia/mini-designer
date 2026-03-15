<template>
  <div class="min-h-screen flex flex-col bg-white">
    <slot />
    <footer class="bg-slate-200 px-8 py-5 mt-auto">
      <NuxtLink
        to="/about"
        class="text-sm font-semibold hover:underline"
      >
        About this project
      </NuxtLink>
    </footer>
  </div>
</template>
