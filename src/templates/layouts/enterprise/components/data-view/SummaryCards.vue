<script setup lang="ts">
import { css } from '@mekari/pixel3'

interface Props {
  /** Number of columns in the grid */
  columns?: number
}

withDefaults(defineProps<Props>(), {
  columns: 4,
})
</script>

<template>
  <div
    data-component="SummaryCards"
    data-component-group="data-view"
    :class="css({
      display: 'grid',
      gap: '4',
      mb: '6',
    })"
    :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }"
  >
    <slot />
  </div>
</template>
