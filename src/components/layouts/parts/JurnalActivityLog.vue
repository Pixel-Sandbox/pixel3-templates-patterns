<script setup lang="ts">
  import {
    MpDrawer,
    MpDrawerBody,
    MpDrawerCloseButton,
    MpDrawerContent,
    MpDrawerOverlay,
    MpButton
  } from '@mekari/pixel3'
  import { ref } from 'vue'

  const isOpen = ref(false)
</script>

<template>
  <MpButton
    v-tooltip="'Riwayat aktivitas'"
    aria-label="jurnal activity log button"
    left-icon="time"
    variant="ghost"
    @click="isOpen = true"
  />

  <MpDrawer :isOpen="isOpen" size="sm" style="z-index: 99999" @close="isOpen = false">
    <MpDrawerContent>
      <MpDrawerBody>
        <MpDrawerCloseButton />

        <slot />
      </MpDrawerBody>
    </MpDrawerContent>

    <MpDrawerOverlay />
  </MpDrawer>
</template>
