<script setup lang="ts">
  import {
    MpDrawer,
    MpDrawerBody,
    MpDrawerCloseButton,
    MpDrawerContent,
    MpDrawerOverlay,
    MpIcon,
    css
  } from '@mekari/pixel3'
  import { ref } from 'vue'

  const isOpen = ref(false)

  const buttonStyle = css({
    cursor: 'pointer',
    height: '9.5',
    minWidth: '9.5',
    padding: '1.5',
    rounded: 'sm',
    transition: 'all 250ms ease 0s',
    _focus: {
      boxShadow: 'outer',
      outline: 'none'
    },
    _hover: {
      background: 'gray.25'
    }
  })
</script>

<template>
  <button v-tooltip="'Switch App'" :class="buttonStyle" @click="isOpen = true">
    <MpIcon name="shortcuts" size="md" />
  </button>

  <MpDrawer :isOpen="isOpen" size="sm" @close="isOpen = false" style="z-index: 99999">
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
