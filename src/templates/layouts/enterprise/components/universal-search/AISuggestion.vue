<script setup lang="ts">
import { css, MpText, MpIcon } from '@mekari/pixel3'

const emit = defineEmits<{
  /** Emitted when the AI suggestion banner is clicked */
  click: []
}>()

function handleClick() {
  emit('click')
}

// Styles
const containerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  w: 'full',
  px: '3',
  py: '2',
  bg: '#E5EDFF',
  borderRadius: 'md',
  cursor: 'pointer',
  _hover: {
    bg: '#D6E4FF',
  },
})

const contentStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
})

const iconStyles = css({
  color: 'icon.brand',
})

const linkStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  color: 'text.link',
  fontWeight: 'medium',
})
</script>

<template>
  <button
    type="button"
    data-component="AISuggestion"
    data-component-group="universal-search"
    :class="containerStyles"
    @click="handleClick"
  >
    <div :class="contentStyles">
      <MpIcon name="airene-brand" size="sm" :class="iconStyles" />
      <MpText size="label" color="text.secondary">or ask anything to Mekari AI</MpText>
    </div>

    <div :class="linkStyles">
      <MpText size="label" color="text.link">Try now</MpText>
      <MpIcon name="chevrons-right" size="sm" color="text.default" />
    </div>
  </button>
</template>
