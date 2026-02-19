<script setup lang="ts">
import { css, MpAvatar, MpText, MpFlex, MpIcon, MpDivider, type IconName } from '@mekari/pixel3'
import { DropdownTransition } from '../../shared'

/**
 * Props for UserProfile component
 */
interface UserProfileProps {
  /** User's display name shown in the header and dropdown */
  name: string
  /** Company name displayed below the user's name */
  company: string
}

defineProps<UserProfileProps>()

const menuItems = [
  { label: 'My info', icon: 'employee' as IconName },
  { label: 'Company info', icon: 'company' as IconName },
  { label: 'Refer Mekari to friends', icon: 'gift' as IconName },
  { label: 'Release notes', icon: 'join-invoice' as IconName },
  { label: 'Contact support', icon: 'call-active' as IconName }
]

const triggerStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  cursor: 'pointer',
  px: '2',
  py: '1',
  rounded: 'lg',
  _groupHover: {
    bg: 'background.header.menu.hovered'
  },
  _active: {
    bg: 'teal.800'
  },
  _focusVisible: {
    outline: '2px solid token(colors.lime.300)',
    outlineOffset: '2px'
  }
})

const dropdownListStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

const dropdownItemStyles = css({
  px: '3',
  py: '2',
  width: 'full',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  textAlign: 'left',
  outline: 'none',
  fontSize: 'md',
  flex: '0 0 auto',
  userSelect: 'none',
  cursor: 'pointer',
  color: 'text.default',
  _hover: {
    bg: 'background.neutral.hovered',
    color: 'text.default'
  }
})

const dropdownItemWithValueStyles = css({
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
    bg: 'background.neutral.hovered',
    color: 'text.default'
  }
})
</script>

<template>
  <DropdownTransition
    data-component="UserProfile"
    data-component-group="layout"
    align="right"
    min-width="280px"
  >
    <template #trigger>
      <button :class="triggerStyles">
        <MpAvatar :name="name" src="https://assets.dimrak.me/avatar/memoji/man-29.webp" />

        <MpFlex direction="column" alignItems="flex-start">
          <MpText weight="semiBold" color="text.inverse">
            {{ name }}
          </MpText>

          <MpText size="body-small" color="text.inverse">
            {{ company }}
          </MpText>
        </MpFlex>
      </button>
    </template>

    <div :class="css({
      display: 'flex',
      flexDirection: 'column',
      pt: '2'
    })">
      <div :class="dropdownListStyles">
        <button v-for="(item, index) in menuItems" :key="index" :class="dropdownItemStyles">
          <MpIcon :name="(item.icon as any)" size="sm" color="icon.brand" />
          <span>{{ item.label }}</span>
        </button>
      </div>

      <MpDivider />

      <div :class="dropdownListStyles">
        <button :class="dropdownItemWithValueStyles">
          <span>Language</span>
          <span :class="css({ color: 'text.secondary' })">English</span>
        </button>
        <button :class="dropdownItemStyles">
          <span>Sign out</span>
        </button>

        <div :class="css({
          display: 'flex',
          justifyContent: 'flex-start',
          textAlign: 'left',
          pt: '1',
          pb: '2',
          px: '3',
          width: 'full'
        })">
          <MpText color="text.secondary">
            Company ID: 680128
          </MpText>
        </div>
      </div>


      <img src="/enterprise/banner.png" />
    </div>
  </DropdownTransition>
</template>
