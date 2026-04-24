<script setup lang="ts">
import { css, MpText } from '@mekari/pixel3'
import { cva } from '@mekari/pixel3-styled-system/css'
import type { SearchScope } from './types'
import { SCOPE_CONFIGS } from './types'

/**
 * Props for SearchScopeTabs component
 */
interface SearchScopeTabsProps {
  /** Currently active search scope/filter */
  activeScope: SearchScope
}

const props = defineProps<SearchScopeTabsProps>()

const emit = defineEmits<{
  /** Emitted when user clicks a different scope tab */
  change: [scope: SearchScope]
}>()

function handleScopeClick(scope: SearchScope) {
  emit('change', scope)
}

// Styles
const containerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  px: '4',
  py: '2',
  borderBottomWidth: '1px',
  borderColor: 'border.default',
})

const labelStyles = css({
  flexShrink: 0,
})

const tabsContainerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  overflowX: 'auto',
})

const tabStyles = cva({
  base: {
    px: '1.5',
    py: '0.5',
    rounded: 'full',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: 'sm',
    fontWeight: 'medium',
    border: 'none',
  },
  variants: {
    isActive: {
      true: {
        bg: 'background.brand.bold',
        color: 'text.inverse',
        _hover: {
          bg: 'background.brand.bold',
        },
      },
      false: {
        color: 'text.secondary',
        bg: 'background.neutral.subtle',
        _hover: {
          bg: 'background.neutral.subtle.hovered',
        },
      },
    },
  },
})
</script>

<template>
  <div
    data-component="SearchScopeTabs"
    data-component-group="universal-search"
    :class="containerStyles"
  >
    <MpText size="label" weight="semiBold" :class="labelStyles">Search in:</MpText>

    <div :class="tabsContainerStyles">
      <button
        v-for="scope in SCOPE_CONFIGS"
        :key="scope.id"
        type="button"
        :class="tabStyles({ isActive: props.activeScope === scope.id })"
        @click="handleScopeClick(scope.id)"
      >
        {{ scope.label }}
      </button>
    </div>
  </div>
</template>
