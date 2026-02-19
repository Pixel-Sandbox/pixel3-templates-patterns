<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { css, MpIcon, MpText, MpBadge } from '@mekari/pixel3'
import { useUniversalSearch } from '../../../composables/useUniversalSearch'
import { UniversalSearch } from '../../universal-search'

const { open, handleKeyboardShortcut } = useUniversalSearch()

onMounted(() => {
  window.addEventListener('keydown', handleKeyboardShortcut)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboardShortcut)
})

const buttonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  w: '400px',
  px: '3',
  py: '2',
  rounded: 'full',
  cursor: 'pointer',
  bg: 'background.header.menu.hovered',
  _hover: {
    bg: 'background.header.menu.hovered'
  },
  _focusVisible: {
    outline: '2px solid token(colors.lime.300)',
    outlineOffset: '2px'
  },
})

const contentStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  opacity: '0.5'
})

const badgeStyles = css({
  bg: 'nav.parent !important',
  color: 'text.inverse !important',
  opacity: '0.5'
})
</script>

<template>
  <div data-component="QuickSearch" data-component-group="layout">
    <button
      :class="buttonStyles"
      @click="open"
    >
      <div :class="contentStyles">
        <MpIcon name="search" color="icon.inverse" />
        <MpText color="text.inverse">Search or jump to...</MpText>
      </div>

      <MpBadge for="tableStatus" :class="badgeStyles">⌘K</MpBadge>
    </button>

    <UniversalSearch />
  </div>
</template>
