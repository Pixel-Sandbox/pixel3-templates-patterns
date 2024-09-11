<script setup lang="ts">
  import { MpIcon, MpPopover, MpPopoverContent, MpPopoverTrigger, css } from '@mekari/pixel3'

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
  <MpPopover>
    <MpPopoverTrigger>
      <button v-tooltip="'Notifikasi'" :class="buttonStyle">
        <MpIcon name="notification" size="md" />
      </button>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          width: '512px',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          position: 'relative'
        })
      "
    >
      <slot />
    </MpPopoverContent>
  </MpPopover>
</template>
