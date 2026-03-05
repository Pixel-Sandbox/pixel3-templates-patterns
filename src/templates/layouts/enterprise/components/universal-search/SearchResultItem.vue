<script setup lang="ts">
import { computed } from 'vue'
import { css, MpIcon, MpText, MpAvatar } from '@mekari/pixel3'
import type { SearchResultItem } from './types'

/**
 * Props for SearchResultItem component
 */
interface SearchResultItemProps {
  /** The search result item data to display */
  item: SearchResultItem
  /** Search query text to highlight matches in the item name */
  highlightQuery?: string
  /** Whether this item is currently active/focused via keyboard navigation */
  isActive?: boolean
}

const props = withDefaults(
  defineProps<SearchResultItemProps>(),
  {
    highlightQuery: '',
    isActive: false,
  }
)

const emit = defineEmits<{
  /** Emitted when the item is clicked or selected */
  select: [item: SearchResultItem]
}>()

function handleClick() {
  emit('select', props.item)
}

/**
 * Highlight matching text in the name
 */
const highlightedName = computed(() => {
  if (!props.highlightQuery) {
    return props.item.name
  }

  const query = props.highlightQuery.trim()
  if (!query) {
    return props.item.name
  }

  // Escape special regex characters
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  return props.item.name.replace(regex, '<mark>$1</mark>')
})

/**
 * Get icon name based on category
 */
const iconName = computed(() => {
  // Use item's icon if specified
  if (props.item.icon) {
    return props.item.icon
  }
  // Fallback based on category
  switch (props.item.category) {
    case 'contacts':
      return 'company'
    case 'quick-actions':
      return 'add'
    case 'files':
      return 'doc'
    case 'help-center':
      return 'help'
    default:
      return 'doc'
  }
})

// Styles
const itemStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  w: 'full',
  px: '3',
  py: '1.5',
  cursor: 'pointer',
  bg: 'transparent',
  border: 'none',
  textAlign: 'left',
  _hover: {
    bg: 'background.neutral.hovered',
  },
})

const itemActiveStyles = css({
  bg: 'background.neutral.hovered',
})

const iconContainerStyles = css({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '6',
  h: '6',
})

const textContainerStyles = css({
  flex: 1,
  minW: 0,
})

const nameStyles = css({
  '& mark': {
    fontWeight: 'semibold',
    bg: 'transparent',
    color: 'inherit',
  },
})
</script>

<template>
  <button
    type="button"
    data-component="SearchResultItem"
    data-component-group="universal-search"
    :data-search-item-id="item.id"
    :class="[itemStyles, isActive && itemActiveStyles]"
    @click="handleClick"
  >
    <!-- Icon container -->
    <div :class="iconContainerStyles">
      <!-- Avatar for contacts with image -->
      <MpAvatar
        v-if="item.category === 'contacts' && item.avatarSrc"
        size="sm"
        :name="item.name"
        :src="item.avatarSrc"
      />
      <!-- Icon for all other cases -->
      <MpIcon
        v-else
        :name="iconName"
        size="sm"
        color="icon.default"
      />
    </div>

    <!-- Text content -->
    <div :class="textContainerStyles">
      <MpText :class="nameStyles" v-html="highlightedName" />
    </div>
  </button>
</template>
