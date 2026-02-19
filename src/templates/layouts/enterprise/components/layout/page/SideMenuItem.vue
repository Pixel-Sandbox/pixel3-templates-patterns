<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { css, MpText, MpIcon, type IconName } from '@mekari/pixel3'

/**
 * Props for SideMenuItem component
 */
interface SideMenuItemProps {
  /** Display text for the menu item */
  label: string
  /** Navigation route path */
  link: string
  /** Optional trailing icon. Pass null for no icon */
  icon?: IconName | null
}

defineProps<SideMenuItemProps>()

const route = useRoute()

const isActive = (link: string) => route.path === link
</script>

<template>
  <RouterLink
    :to="link"
    data-component="SideMenuItem"
    data-component-group="layout"
    :class="css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: icon ? 'space-between' : 'flex-start',
      height: '36px',
      px: '2',
      py: '1.5',
      rounded: 'md',
      cursor: 'pointer',
      textAlign: 'left',
      textDecoration: 'none',
      color: 'inherit',
      bg: isActive(link) ? 'background.neutral.subtle.selected' : 'transparent',
      _hover: {
        bg: isActive(link) ? 'background.neutral.subtle.selected' : 'background.neutral.subtle.hovered'
      },
    })"
  >
    <MpText :weight="isActive(link) ? 'semiBold' : 'regular'">
      {{ label }}
    </MpText>
    <MpIcon v-if="icon" :name="icon" size="sm" />
  </RouterLink>
</template>
