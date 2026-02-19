<script setup lang="ts">
import { computed } from 'vue'
import { css, MpButton, type ButtonSize, type ButtonVariant } from '@mekari/pixel3'

/**
 * Props for AskAiButton component
 */
interface AskAiButtonProps {
  /** Button size variant */
  size?: ButtonSize
  /** Button variant style */
  variant?: ButtonVariant
  /** Visual active/pressed state */
  isActive?: boolean
  /** Use inverse colors for dark backgrounds (e.g., header) */
  inverse?: boolean
}

const props = withDefaults(defineProps<AskAiButtonProps>(), {
  size: 'sm',
  variant: 'ghost',
  inverse: false
})

const inverseStyle = computed(() =>
  props.inverse ? css({
    color: 'icon.inverse',
    _hover: { bg: '#265C5880' },
    _active: { bg: '#265C58' }
  }) : undefined
)
</script>

<template>
  <MpButton
    data-component="AskAiButton"
    data-component-group="shared"
    aria-label="Ask AI"
    left-icon="airene-brand"
    :variant="variant"
    :size="size"
    :class="inverseStyle"
    :data-active="isActive || undefined"
  />
</template>
