<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import { usePixelTheme } from '@mekari/pixel3-utils'
  import { useRoute, useRouter } from 'vue-router'
  import { useAppThemeSwitcher } from '@/components/layouts/composables/useAppThemeSwitcher'

  const route = useRoute()
  const router = useRouter()
  const { setDarkMode, isNextTheme, setNextTheme } = usePixelTheme()

  const { watchOSTheme } = useAppThemeSwitcher()

  const cleanup = watchOSTheme()

  // Apply next theme (Design Token v2.4) immediately.
  // Do nothing if already in next theme.
  if (!isNextTheme.value) setNextTheme(true)

  onMounted(async () => {
    // Wait for router is ready
    await router.isReady()

    // Set theme based on query params
    if (route.query.theme === 'dark') setDarkMode(true)

    if (route.query.theme === 'light') setDarkMode(false)
  })

  // Clean up when component unmounts
  onUnmounted(() => cleanup())
</script>

<template>
  <RouterView />
</template>

<style>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  ::view-transition-old(root),
  .dark::view-transition-new(root) {
    z-index: 1;
  }

  ::view-transition-new(root),
  .dark::view-transition-old(root) {
    z-index: 9999;
  }
</style>
