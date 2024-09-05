<script setup lang="ts">
import {
  MpButton,
  MpDrawer,
  MpDrawerBody,
  MpDrawerCloseButton,
  MpDrawerContent,
  MpDrawerOverlay,
  MpIcon,
  css,
} from "@mekari/pixel3";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <MpButton
    v-tooltip="'Switch app'"
    aria-label="Switch app button"
    left-icon="shortcuts"
    variant="ghost"
    @click="isOpen = true"
  />

  <MpDrawer
    :isOpen="isOpen"
    size="sm"
    @close="isOpen = false"
    style="z-index: 99999"
  >
    <MpDrawerContent>
      <MpDrawerBody
        :class="
          css({
            maxHeight: 'calc(100vh)',
            overflow: 'hidden auto',
            padding: 0,
            marginTop: ['4', '20'],
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
