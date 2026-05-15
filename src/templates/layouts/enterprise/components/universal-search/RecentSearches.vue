<script setup lang="ts">
import { css, MpText, MpFlex } from '@mekari/pixel3'
import type { RecentSearch } from './types'

/**
 * Props for RecentSearches component
 */
interface RecentSearchesProps {
  /** List of recent search queries to display */
  items: RecentSearch[]
}

defineProps<RecentSearchesProps>()

const emit = defineEmits<{
  /** Emitted when a recent search item is clicked */
  select: [search: RecentSearch]
  /** Emitted when clear all button is clicked */
  clear: []
}>()

function handleSelect(search: RecentSearch) {
  emit('select', search)
}

function handleClear() {
  emit('clear')
}

// Styles
const containerStyles = css({
  py: '4',
})

const headerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: '5',
  mb: '2',
})

const clearButtonStyles = css({
  color: 'text.secondary',
  textDecoration: 'underline',
  cursor: 'pointer',
  _hover: {
    color: 'text.link',
  },
})

const itemsContainerStyles = css({
  px: '3',
})

const itemStyles = css({
  display: 'flex',
  alignItems: 'center',
  w: 'full',
  h: '10',
  px: '2',
  rounded: 'md',
  cursor: 'pointer',
  _hover: {
    bg: 'background.neutral.hovered',
  },
})
</script>

<template>
  <div
    data-component="RecentSearches"
    data-component-group="universal-search"
    :class="containerStyles"
  >
    <!-- Header -->
    <div :class="headerStyles">
      <MpText weight="semiBold">Recent searches</MpText>
      <MpText
        size="label"
        :class="clearButtonStyles"
        @click="handleClear"
      >
        Clear
      </MpText>
    </div>

    <!-- Recent search items -->
    <div :class="itemsContainerStyles">
      <button
        v-for="search in items"
        :key="search.id"
        type="button"
        :class="itemStyles"
        @click="handleSelect(search)"
      >
        <MpText>{{ search.query }}</MpText>
      </button>
    </div>
  </div>
</template>
