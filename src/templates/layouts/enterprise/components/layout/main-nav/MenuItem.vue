<script setup lang="ts">
import { computed } from 'vue'
import { css, MpText, MpIcon, MpDivider } from '@mekari/pixel3'
import { RouterLink, useRoute } from 'vue-router'
import { DropdownTransition } from '../../shared'

export interface DropdownItem {
  label: string
  icon?: string
  link?: string
}

export interface DropdownGroup {
  items: DropdownItem[]
}

/**
 * Props for MenuItem component
 */
interface MenuItemProps {
  /** Display text for the menu item */
  label: string
  /** Navigation link URL. If provided without menuGroups, renders as a simple link */
  link?: string
  /** Force active state regardless of current route */
  isActive?: boolean
  /** Dropdown menu groups. When provided, renders as a dropdown trigger */
  menuGroups?: DropdownGroup[]
}

const props = defineProps<MenuItemProps>()

const route = useRoute()

const isMenuActive = computed(() => {
  // Manual override
  if (props.isActive) return true

  // Check single link (for menu without dropdown)
  if (props.link && route.path.startsWith(props.link)) return true

  // Check menuGroups links
  if (props.menuGroups) {
    return props.menuGroups.some(group =>
      group.items.some(item =>
        item.link && route.path.startsWith(item.link)
      )
    )
  }

  return false
})

const triggerStyles = (isActive: boolean) =>
  css({
    display: 'inline-block',
    textDecoration: 'none',
    px: '3',
    py: '1',
    rounded: 'full',
    cursor: 'pointer',
    color: isActive ? 'text.default' : 'text.inverse',
    bg: isActive ? 'background.header.menu.selected' : 'transparent',
    _groupHover: {
      bg: isActive ? 'background.header.menu.selected' : 'background.header.menu.hovered'
    },
    _active: {
      bg: 'background.header.menu.selected',
    },
    _focusVisible: {
      outline: '2px solid background.header.menu.selected',
      outlineOffset: '2px'
    }
  })

const dropdownListStyles = css({
  pt: '3',
  pb: '2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

// Check if a dropdown item is active
const isItemActive = (link?: string) => {
  if (!link) return false
  return route.path.startsWith(link)
}

const dropdownItemStyles = css({
  px: '3',
  py: '2',
  width: 'full',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'left',
  outline: 'none',
  fontSize: 'md',
  flex: '0 0 auto',
  userSelect: 'none',
  cursor: 'pointer',
  color: 'text.default',
  _hover: {
    background: 'background.neutral.hovered',
    color: 'text.default',
    outline: 0
  },
  '&[data-active="true"]': {
    background: 'background.neutral.subtle.selected !important',
    color: 'text.default',
    outline: 0
  }
})
</script>

<template>
  <!-- Single link (no dropdown) -->
  <RouterLink
    v-if="link && !menuGroups?.length"
    :to="link"
    class="group"
    data-component="MenuItem"
    data-component-group="layout"
    :class="triggerStyles(isMenuActive)"
  >
    <MpText color="inherit">{{ label }}</MpText>
  </RouterLink>

  <!-- With dropdown -->
  <DropdownTransition
    v-else
    data-component="MenuItem"
    data-component-group="layout"
    align="left"
    min-width="200px"
  >
    <template #trigger>
      <button :class="triggerStyles(isMenuActive)">
        <MpText color="inherit">{{ label }}</MpText>
      </button>
    </template>

    <div :class="dropdownListStyles">
      <template v-for="(group, groupIndex) in menuGroups" :key="groupIndex">
        <MpDivider v-if="groupIndex > 0" :class="css({ my: '2' })" />
        <template v-for="(item, itemIndex) in group.items" :key="itemIndex">
          <RouterLink
            v-if="item.link"
            :to="item.link"
            :class="dropdownItemStyles"
            :data-active="isItemActive(item.link)"
          >
            <span>{{ item.label }}</span>
            <MpIcon v-if="item.icon" :name="(item.icon as any)" size="sm" color="gray.600" />
          </RouterLink>
          <button
            v-else
            :class="dropdownItemStyles"
          >
            <span>{{ item.label }}</span>
            <MpIcon v-if="item.icon" :name="(item.icon as any)" size="sm" color="gray.600" />
          </button>
        </template>
      </template>
    </div>
  </DropdownTransition>
</template>
