<script setup lang="ts">
import { css, MpFlex } from '@mekari/pixel3'
import { AskAiButton, IconButton, MekariSuperpLogo } from '../../shared'
import QuickActions from './QuickActions.vue'
import QuickSearch from './QuickSearch.vue'
import UserProfile from './UserProfile.vue'

defineEmits<{
  /** Emitted when AI sidebar toggle button is clicked. Used to show/hide the right AI panel */
  toggleAI: []
}>()
</script>

<template>
  <header
    data-component="HeaderBar"
    data-component-group="layout"
    :class="css({
    height: '56px',
    bg: 'background.surface.bold',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    py: '2.5',
    px: '5'
  })">
    <div data-section="left" :class="css({ justifySelf: 'start' })">
      <MekariSuperpLogo />
    </div>

    <div data-section="center" :class="css({ justifySelf: 'center' })">
      <QuickSearch />
    </div>

    <MpFlex data-section="right" :class="css({ justifySelf: 'end' })" alignItems="center" gap="2">
      <MpFlex alignItems="center" gap="1">
        <QuickActions />
        <IconButton icon="help" />
        <IconButton icon="desktop" />
        <IconButton icon="notification" />
      </MpFlex>

      <UserProfile name="Rizal Candra" company="PT Central Perk Indonesia" />
    </MpFlex>
  </header>
</template>
