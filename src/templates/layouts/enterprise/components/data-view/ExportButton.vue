<script setup lang="ts">
import {
  css,
  MpButton,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpText,
} from '@mekari/pixel3'
</script>

<template>
  <MpPopover
    id="export-button"
    data-component="ExportButton"
    data-component-group="data-view"
  >
    <MpPopoverTrigger>
      <MpButton aria-label="export" left-icon="upload" variant="ghost" size="sm" />
    </MpPopoverTrigger>
    <MpPopoverContent :class="css({ minWidth: '200px', p: '4' })">
      <MpText color="text.secondary" :class="css({ textAlign: 'center' })">
        Export options coming soon
      </MpText>
    </MpPopoverContent>
  </MpPopover>
</template>
