<script setup lang="ts">
import { css } from '@mekari/pixel3'
import { HeaderBar } from './header'
import { MainNav } from './main-nav'
import { useAppSidebar } from '../../composables/useAppSidebar'

// Get sidebar state from composable (for HeaderBar AI toggle)
const { right } = useAppSidebar()
</script>

<template>
  <div :class="css({ bg: 'background.surface.bold' })">
    <HeaderBar @toggle-a-i="right.toggle" />
    <MainNav />

    <slot />
  </div>
</template>
