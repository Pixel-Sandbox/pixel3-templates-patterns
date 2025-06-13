<script setup lang="ts">
  import {
    Pixel,
    css,
    MpFlex,
    MpIcon,
    MpText,
    MpButton,
    MpTooltip,
    MpAutocomplete,
    MpPopover,
    MpPopoverTrigger,
    MpPopoverContent,
    MpPopoverList,
    MpPopoverListItem
  } from '@mekari/pixel3'
</script>

<template>
  <Pixel.div px="2" py="4">
    <MpFlex justify="space-between">
      <MpFlex align="center">
        <MpText :class="css({ pr: '1', pl: '1' })" color="gray.600">Rows per page</MpText>
        <MpPopover isCloseOnSelect>
          <MpPopoverTrigger>
            <Pixel.div v-tooltip="'Result per page'">
              <MpButton
                size="sm"
                variant="ghost"
                :class="css({ h: '7', display: 'inline-flex', pl: '3', pr: '2', py: '2' })"
              >
                <MpText>10</MpText>
                <MpIcon name="chevrons-down" size="sm" />
              </MpButton>
            </Pixel.div>
          </MpPopoverTrigger>
          <MpPopoverContent>
            <MpPopoverList>
              <MpPopoverListItem is-active>10</MpPopoverListItem>
              <MpPopoverListItem>25</MpPopoverListItem>
              <MpPopoverListItem>50</MpPopoverListItem>
              <MpPopoverListItem>100</MpPopoverListItem>
            </MpPopoverList>
          </MpPopoverContent>
        </MpPopover>

        <MpText :class="css({ pl: '5', py: '1' })" color="gray.600">
          Showing 120-130 of 242
        </MpText>
      </MpFlex>
      <MpFlex align-items="center">
        <Pixel.div>
          <MpAutocomplete
            :class="css({ w: '16', h: '7.5', pr: '8' })"
            is-searchable
            :v-model="1"
            v-tooltip="'Jump to page'"
          />
        </Pixel.div>
        <MpText :class="css({ pl: '2', pr: '4', py: '1' })" color="gray.600">of 24 page</MpText>
        <MpTooltip label="Prev page" position="bottom">
          <MpButton variant="ghost" left-icon="chevrons-left" size="sm" v-tooltip="'Prev page'" />
        </MpTooltip>
        <MpTooltip label="Next page" position="bottom">
          <MpButton variant="ghost" left-icon="chevrons-right" size="sm" v-tooltip="'Next page'" />
        </MpTooltip>
      </MpFlex>
    </MpFlex>
  </Pixel.div>
</template>
