<script setup lang="ts">
  import { unref } from 'vue';
import {
  css,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem
} from '@mekari/pixel3'
import { IconButton } from '../../shared'
</script>

<template>
  <MpPopover
    id="quick-actions"
    data-component="QuickActions"
    data-component-group="layout"
    v-slot="{ isOpen }"
  >
    <MpPopoverTrigger>
      <IconButton icon="add" :isActive="unref(isOpen)" />
    </MpPopoverTrigger>
    <MpPopoverContent :class="css({ minWidth: '200px' })">
      <p :class="css({ color: 'gray.600', pt: 4, px: 3, _nextTheme: { color: 'text.secondary' } })">
        CREATE/ADD
      </p>
      <MpPopoverList>
        <MpPopoverListItem>Sales invoice</MpPopoverListItem>
        <MpPopoverListItem>Sales quote</MpPopoverListItem>
        <MpPopoverListItem>Purchase order</MpPopoverListItem>
        <MpPopoverListItem>Upload bills</MpPopoverListItem>
        <MpPopoverListItem>Product</MpPopoverListItem>
        <MpPopoverListItem>Journal entry</MpPopoverListItem>
        <MpPopoverListItem>Transfer money</MpPopoverListItem>
        <MpPopoverListItem>Receive money</MpPopoverListItem>
        <MpPopoverListItem>Spend money</MpPopoverListItem>
      </MpPopoverList>
    </MpPopoverContent>
  </MpPopover>
</template>
