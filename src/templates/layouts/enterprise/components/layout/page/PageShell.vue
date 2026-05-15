<script setup lang="ts">
import { css } from '@mekari/pixel3'
</script>

<template>
  <div
    data-component="PageShell"
    data-component-group="layout"
    :class="css({
      display: 'flex',
      width: 'full',
      px: '1'
    })"
  >
    <div :class="css({
      bg: 'background.neutral.subtle',
      minHeight: 'calc(100vh - 56px - 44px)',
      roundedTop: '10px',
      width: 'full',
      display: 'flex',
      overflowX: 'hidden',
    })">
      <slot />
    </div>
  </div>
</template>
