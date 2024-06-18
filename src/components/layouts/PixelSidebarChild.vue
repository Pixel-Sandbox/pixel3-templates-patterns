<script setup lang="ts">
import { MpText, css } from '@mekari/pixel3'
import { usePixelLayout } from './composables'

const { isSidebarChildCollapsed, useSidebarChild } = usePixelLayout()
</script>

<template>
  <div
    :class="css({
      flex: 'none',
      background: 'background',
      paddingTop: 'var(--pixel-navbar-height)',
      width: isSidebarChildCollapsed ? '16px' : '204',
      height: '100vh',
      transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
      borderLeftWidth: '1px',
      borderRightWidth: isSidebarChildCollapsed ? '1px' : '0px',
      borderColor: 'gray.100',
      cursor: isSidebarChildCollapsed ? 'pointer' : '',
      _hover: {
        background: isSidebarChildCollapsed ? 'ash.100' : '',
      },
      marginRight: isSidebarChildCollapsed ? '16px' : '',
    })"
    @click="isSidebarChildCollapsed ? useSidebarChild.toggle() : () => {}"
  >
    <div
      :class="css({
        p: 2,
        opacity: isSidebarChildCollapsed ? '0' : '100',
      })"
    >
      <MpText>
        CHILD MENU
      </MpText>
    </div>
  </div>
</template>
