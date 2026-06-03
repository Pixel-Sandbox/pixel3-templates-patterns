<script setup lang="ts">
import { css, MpText, MpIcon, MpFlex, MpButton } from '@mekari/pixel3'

const emit = defineEmits<{
  /** Emitted when pin/close button is clicked. Used to hide the AI sidebar panel */
  toggle: []
}>()
</script>

<template>
  <div
    data-component="SideMenuAI"
    data-component-group="layout"
    :class="css({
    display: 'flex',
    flexDirection: 'column',
    height: 'full',
    px: '3'
  })">
    <!-- Toolbar -->
    <div :class="css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '72px',
    })">
      <MpFlex gap="2" alignItems="center">
        <MpIcon name="airene-brand" />
        <MpText weight="semiBold">
          Mekari AI
        </MpText>
      </MpFlex>

      <MpFlex>
        <MpButton left-icon="chat" variant="ghost" size="sm" />
        <MpButton left-icon="sidebar-pin" variant="ghost" size="sm" @click="emit('toggle')" />
      </MpFlex>
    </div>

    <!-- Chat Container -->
    <div :class="css({
      flex: '1',
      bg: 'background.neutral',
      rounded: 'lg',
      p: '4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })">
      <!-- Empty state - content will go here -->
    </div>
  </div>
</template>
