<script setup lang="ts">
import { computed } from 'vue'
import { css, MpText } from '@mekari/pixel3'
import type { SearchResultItem, SearchCategoryConfig } from './types'
import SearchResultItemVue from './SearchResultItem.vue'

/**
 * Props for SearchResultCategory component
 */
interface SearchResultCategoryProps {
  /** Category configuration with label and display settings */
  category: SearchCategoryConfig
  /** List of search result items to display */
  items: SearchResultItem[]
  /** Whether the category list is expanded to show all items */
  isExpanded?: boolean
  /** Search query text to highlight in result names */
  highlightQuery?: string
  /** ID of the currently active/focused item for keyboard navigation */
  activeItemId?: string | null
}

const props = withDefaults(
  defineProps<SearchResultCategoryProps>(),
  {
    isExpanded: false,
    highlightQuery: '',
    activeItemId: null,
  }
)

const emit = defineEmits<{
  /** Emitted when show more/less toggle is clicked */
  toggleExpand: []
  /** Emitted when a result item is selected/clicked */
  select: [item: SearchResultItem]
}>()

/**
 * Visible items based on expansion state
 */
const visibleItems = computed(() => {
  if (props.isExpanded) {
    return props.items
  }
  return props.items.slice(0, props.category.defaultVisibleCount)
})

/**
 * Whether to show expand/collapse action
 */
const showExpandAction = computed(() => {
  return props.items.length > props.category.defaultVisibleCount
})

function handleToggleExpand() {
  emit('toggleExpand')
}

function handleSelect(item: SearchResultItem) {
  emit('select', item)
}

// Styles
const containerStyles = css({
  py: '2',
})

const headerStyles = css({
  px: '5',
  mb: '2',
})

const itemsContainerStyles = css({
  px: '2',
})

const expandActionStyles = css({
  display: 'inline-block',
  px: '4',
  mt: '2',
  color: 'text.link',
  cursor: 'pointer',
  textDecoration: 'underline',
  _hover: {
    color: 'text.link.pressed',
  },
})
</script>

<template>
  <div
    v-if="items.length > 0"
    data-component="SearchResultCategory"
    data-component-group="universal-search"
    :class="containerStyles"
  >
    <!-- Category Header -->
    <div :class="headerStyles">
      <MpText weight="semiBold">{{ category.label }}</MpText>
    </div>

    <!-- Items List -->
    <div :class="itemsContainerStyles">
      <SearchResultItemVue
        v-for="item in visibleItems"
        :key="item.id"
        :item="item"
        :highlight-query="highlightQuery"
        :is-active="activeItemId === item.id"
        @select="handleSelect"
      />
    </div>

    <!-- Show more/less action -->
    <MpText
      v-if="showExpandAction"
      size="label"
      :class="expandActionStyles"
      @click="handleToggleExpand"
    >
      {{ isExpanded ? 'Show less' : 'Show more' }}
    </MpText>
  </div>
</template>
