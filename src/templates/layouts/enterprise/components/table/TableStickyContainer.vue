<script setup lang="ts">
import { css } from '@mekari/pixel3'

defineProps<{
  isVisible: boolean
  placement?: 'top' | 'bottom'
  topOffset?: string
}>()
</script>

<template>
  <div
    data-component="TableStickyContainer"
    :class="css({
      position: 'absolute',
      visibility: isVisible ? 'visible' : 'hidden',
      pointerEvents: isVisible ? 'auto' : 'none',
    })"
  >
    <div
      :class="css({
        position: 'fixed',
        zIndex: 'sticky',
        bg: 'background.neutral.subtle',
        boxShadow: '0px 2px var(--mp-colors-border-default)',
      })"
      :style="{
        top: placement === 'bottom' ? 'auto' : topOffset || '0px',
        bottom: placement === 'bottom' ? (topOffset || '0px') : 'auto',
      }"
    >
      <div
        :class="css({
          position: 'relative',
          left: '0px',
          width: 'full',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease',
        })"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
