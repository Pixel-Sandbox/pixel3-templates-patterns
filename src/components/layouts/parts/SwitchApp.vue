<script setup lang="ts">
  import { ref } from 'vue'
  import {
    MpButton,
    MpDrawer,
    MpDrawerBody,
    MpDrawerCloseButton,
    MpDrawerContent,
    MpDrawerOverlay,
    css
  } from '@mekari/pixel3'

  const isOpen = ref(false)
</script>

<template>
  <MpButton
    v-tooltip="'Switch app'"
    aria-label="Switch app button"
    left-icon="shortcuts"
    variant="ghost"
    @click="isOpen = true"
  />

  <MpDrawer :isOpen="isOpen" size="sm" style="z-index: 99999" @close="isOpen = false">
    <MpDrawerContent>
      <MpDrawerBody
        :class="
          css({
            maxHeight: 'calc(100vh)',
            overflow: 'hidden auto',
            padding: 0,
            marginTop: ['4', '20']
          })
        "
      >
        <MpDrawerCloseButton />

        <slot />
      </MpDrawerBody>
    </MpDrawerContent>

    <MpDrawerOverlay />
  </MpDrawer>
</template>
