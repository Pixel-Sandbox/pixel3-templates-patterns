<script setup lang="ts">
import { css } from '@mekari/pixel3'

interface PageRightSidebarProps {
  open?: boolean
}

withDefaults(defineProps<PageRightSidebarProps>(), {
  open: false
})
</script>

<template>
  <div
    data-component="PageRightSidebar"
    data-component-group="layout"
    data-section="sidemenu-ai"
    :class="css({
      width: '280px',
      flexShrink: '0',
      transition: 'all .5s cubic-bezier(.4,0,.2,1) 0s',
      marginRight: open ? '0' : '-280px',
    })"
  >
    <slot />
  </div>
</template>
