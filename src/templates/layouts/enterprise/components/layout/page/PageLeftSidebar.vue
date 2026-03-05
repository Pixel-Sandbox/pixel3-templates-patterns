<script setup lang="ts">
import { css } from '@mekari/pixel3'

interface PageLeftSidebarProps {
  open?: boolean
}

withDefaults(defineProps<PageLeftSidebarProps>(), {
  open: true
})
</script>

<template>
  <div
    data-component="PageLeftSidebar"
    data-component-group="layout"
    data-section="sidemenu"
    :class="css({
      width: '212px',
      flexShrink: '0',
      transition: 'all .5s cubic-bezier(.4,0,.2,1) 0s',
      marginLeft: open ? '0' : '-212px',
    })"
  >
    <slot />
  </div>
</template>
