<script setup lang="ts">
import {
  MpIcon,
  MpButton,
  MpPopover,
  MpPopoverContent,
  MpPopoverTrigger,
  css,
} from "@mekari/pixel3";
</script>

<template>
  <MpPopover>
    <MpPopoverTrigger>
      <MpButton
        v-tooltip="'Notifications'"
        aria-label="notification button"
        left-icon="notification"
        variant="ghost"
      />
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          width: '512px',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          position: 'relative',
        })
      "
    >
      <slot />
    </MpPopoverContent>
  </MpPopover>
</template>
