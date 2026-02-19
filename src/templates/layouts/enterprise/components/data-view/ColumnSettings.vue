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
    id="column-settings"
    data-component="ColumnSettings"
    data-component-group="data-view"
  >
    <MpPopoverTrigger>
      <MpButton aria-label="column settings" left-icon="table-view-column" variant="ghost" size="sm" />
    </MpPopoverTrigger>
    <MpPopoverContent :class="css({ minWidth: '200px', p: '4' })">
      <MpText color="text.secondary" :class="css({ textAlign: 'center' })">
        Column settings coming soon
      </MpText>
    </MpPopoverContent>
  </MpPopover>
</template>
