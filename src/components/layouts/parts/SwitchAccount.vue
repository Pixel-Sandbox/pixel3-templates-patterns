<script setup lang="tsx">
import { MpAvatar, MpPopover, MpPopoverContent, MpPopoverTrigger, MpText, css } from '@mekari/pixel3'
import { usePixelLayout } from '../composables'

const { accountInformation } = usePixelLayout()
</script>

<template>
  <MpPopover>
    <MpPopoverTrigger>
      <div
        :class="css(
          {
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1,
            rounded: 'md',
            cursor: 'pointer',
            _hover: {
              bg: 'gray.50',
              transition: 'background 300ms',
            },
          },
        )"
      >
        <MpAvatar :name="accountInformation.fullName" src="https://i.pravatar.cc/300" />

        <div>
          <MpText weight="semiBold">
            {{ accountInformation.fullName }}
          </MpText>

          <MpText size="label-small" color="gray.600">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </div>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="css({
        width: '65',
        p: 4,
      })"
    >
      Content
    </MpPopoverContent>
  </MpPopover>
</template>
