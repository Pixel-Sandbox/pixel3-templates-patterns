<script setup lang="ts">
import { css } from '@mekari/pixel3'
</script>

<template>
  <div
    data-component="PageMain"
    data-component-group="layout"
    data-section="stage"
    :class="css({
      flex: '1',
      minWidth: '0',
    })"
  >
    <slot />
  </div>
</template>
