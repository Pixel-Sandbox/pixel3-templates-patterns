<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import {
  css,
  MpModal,
  MpModalContent,
  MpModalOverlay,
  MpText,
  MpSpinner,
} from '@mekari/pixel3'
import { useUniversalSearch } from '../../composables/useUniversalSearch'
import { CATEGORY_CONFIGS } from './types'
import type { SearchResultItem, SearchScope } from './types'
import SearchInput from './SearchInput.vue'
import SearchScopeTabs from './SearchScopeTabs.vue'
import AISuggestion from './AISuggestion.vue'
import SearchResultCategory from './SearchResultCategory.vue'

const {
  isOpen,
  query,
  isLoading,
  activeScope,
  displayResults,
  hasResults,
  showEmptyState,
  activeItem,
  close,
  setScope,
  setQuery,
  clearQuery,
  toggleCategory,
  isCategoryExpanded,
  addToRecentSearches,
  navigateDown,
  navigateUp,
} = useUniversalSearch()

// Content container ref for scroll management
const contentRef = ref<HTMLElement | null>(null)

/**
 * Scroll active item into view when it changes
 * Scoped to the content container only
 */
watch(activeItem, async (item) => {
  if (!item || !contentRef.value) return

  await nextTick()

  const container = contentRef.value
  const element = container.querySelector(`[data-search-item-id="${item.id}"]`) as HTMLElement

  if (!element) return

  // Check if element is visible within the container
  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  const isAboveVisible = elementRect.top < containerRect.top
  const isBelowVisible = elementRect.bottom > containerRect.bottom

  if (isAboveVisible || isBelowVisible) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }
})

function handleInputChange(value: string) {
  setQuery(value)
}

function handleInputClear() {
  clearQuery()
}

function handleScopeChange(scope: SearchScope) {
  setScope(scope)
}

function handleAIClick() {
  console.log('AI suggestion clicked')
  // TODO: Implement AI chat integration
}

function handleSelect(item: SearchResultItem) {
  console.log('Selected:', item)
  addToRecentSearches(query.value)
  close()
}

function handleToggleCategory(categoryId: string) {
  toggleCategory(categoryId as any)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    navigateDown()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    navigateUp()
  } else if (event.key === 'Enter' && activeItem.value) {
    event.preventDefault()
    handleSelect(activeItem.value)
  }
}

function handleClose() {
  close()
}

// Styles
const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  maxH: '80vh',
  overflow: 'hidden',
})

const contentStyles = css({
  flex: 1,
  overflowY: 'auto',
})

const loadingStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  px: '4',
  py: '4',
})

const emptyStyles = css({
  px: '4',
  py: '4',
})

const footerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '4',
  px: '4',
  py: '2',
  borderTopWidth: '1px',
  borderColor: 'border.default',
  bg: 'background.neutral.subtle',
})

const footerItemStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
})

const kbdStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '1',
  py: '0.5',
  fontSize: 'sm',
  fontWeight: 'semiBold',
  color: 'text.secondary',
  bg: 'background.neutral.subtle',
})
</script>

<template>
  <MpModal
    id="universal-search-modal"
    :is-open="isOpen"
    :is-close-on-esc="true"
    :is-close-on-overlay-click="true"
    size="lg"
    @close="handleClose"
  >
    <MpModalOverlay />
    <MpModalContent
      :class="css({
        mt: '8',
        maxW: '536px',
        rounded: 'xl',
        overflow: 'hidden',
      })"
    >
      <div
        data-component="UniversalSearch"
        data-component-group="universal-search"
        :class="containerStyles"
        @keydown="handleKeydown"
      >
        <!-- Search Input -->
        <SearchInput
          :model-value="query"
          placeholder="Create"
          @update:model-value="handleInputChange"
          @clear="handleInputClear"
        />

        <!-- Search Scope Tabs -->
        <SearchScopeTabs
          :active-scope="activeScope"
          @change="handleScopeChange"
        />

        <!-- AI Suggestion -->
        <div :class="css({ px: '4', py: '3' })">
          <AISuggestion @click="handleAIClick" />
        </div>

        <!-- Content Area -->
        <div ref="contentRef" :class="contentStyles">
          <!-- Loading State -->
          <div v-if="isLoading" :class="loadingStyles">
            <MpSpinner size="sm" />
            <MpText color="text.secondary">Searching...</MpText>
          </div>

          <!-- Search Results (shows default suggestions when no query) -->
          <template v-else-if="hasResults">
            <SearchResultCategory
              v-for="config in CATEGORY_CONFIGS"
              :key="config.id"
              :category="config"
              :items="displayResults[config.id]"
              :is-expanded="isCategoryExpanded(config.id)"
              :highlight-query="query"
              :active-item-id="activeItem?.id"
              @toggle-expand="handleToggleCategory(config.id)"
              @select="handleSelect"
            />
          </template>

          <!-- Empty State -->
          <div v-else-if="showEmptyState" :class="emptyStyles">
            <MpText color="text.secondary">No results found.</MpText>
          </div>
        </div>

        <!-- Footer with keyboard hints -->
        <div :class="footerStyles">
          <div :class="footerItemStyles">
            <span :class="kbdStyles">↵</span>
            <MpText size="label-small" color="text.secondary">to search</MpText>
          </div>
          <div :class="footerItemStyles">
            <span :class="kbdStyles">ESC</span>
            <MpText size="label-small" color="text.secondary">to close</MpText>
          </div>
        </div>
      </div>
    </MpModalContent>
  </MpModal>
</template>
