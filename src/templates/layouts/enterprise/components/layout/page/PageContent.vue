<script setup lang="ts">
import { css } from '@mekari/pixel3'

/**
 * Props for PageContent component
 */
interface PageContentProps {
  /** Controls the visibility of the left sidebar. Affects border radius styling */
  leftSidebarOpen?: boolean
  /** Controls the visibility of the right sidebar. Affects border radius styling */
  rightSidebarOpen?: boolean
}

withDefaults(defineProps<PageContentProps>(), {
  leftSidebarOpen: true,
  rightSidebarOpen: false
})
</script>

<template>
  <div
    data-component="PageContent"
    data-component-group="layout"
    :class="css({
    minHeight: 'calc(100vh - 56px - 44px - 72px)',
    p: '4',
    bg: 'background.neutral',
    roundedTopLeft: leftSidebarOpen ? '8px' : '0',
    roundedTopRight: rightSidebarOpen ? '8px' : '0',
    transition: 'all .5s cubic-bezier(.4,0,.2,1) 0s',
  })">
    <slot />
  </div>
</template>
