<script setup lang="ts">
import { css, MpText } from '@mekari/pixel3'
import { RouterLink } from 'vue-router'

interface Props {
  /** Card title label */
  title: string
  /** Subtitle or context text (e.g., "As of today") */
  subtitle?: string
  /** Main value to display */
  value: string
  /** Color variant for the value */
  valueColor?: 'default' | 'danger' | 'success' | 'warning'
  /** Label text (e.g., "2 invoices") - clickable if labelLink is provided */
  label?: string
  /** Link URL for the label - makes label clickable */
  labelLink?: string
  /** Whether to show right border separator */
  hasBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  valueColor: 'default',
  hasBorder: true,
})

const valueColorMap = {
  default: undefined,
  danger: 'text.danger',
  success: 'text.success',
  warning: 'text.warning',
} as const
</script>

<template>
  <div
    data-component="SummaryCardItem"
    data-component-group="data-view"
    :class="css({
      borderRightWidth: hasBorder ? '1px' : '0',
      borderColor: 'border.default',
      pr: hasBorder ? '4' : '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    })"
  >
    <MpText>{{ title }}</MpText>
    <MpText v-if="subtitle" size="body-small" color="text.secondary">{{ subtitle }}</MpText>
    <MpText size="h2" :color="valueColorMap[valueColor]">{{ value }}</MpText>
    <RouterLink v-if="label && labelLink" :to="labelLink" :class="css({ textDecoration: 'none' })">
      <MpText size="body-small" color="text.link">{{ label }}</MpText>
    </RouterLink>
    <MpText v-else-if="label" size="body-small" color="text.secondary">{{ label }}</MpText>
  </div>
</template>
