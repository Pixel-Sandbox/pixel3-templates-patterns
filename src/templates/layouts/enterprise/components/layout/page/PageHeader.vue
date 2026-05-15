<script setup lang="ts">
import { css } from '@mekari/pixel3'
</script>

<template>
  <div
    data-component="PageHeader"
    data-component-group="layout"
    :class="css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '72px',
      px: '3',
    })"
  >
    <slot />
  </div>
</template>
