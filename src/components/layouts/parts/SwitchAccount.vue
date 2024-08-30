<script setup lang="tsx">
  import {
    MpAvatar,
    MpPopover,
    MpPopoverContent,
    MpPopoverTrigger,
    MpText,
    css
  } from '@mekari/pixel3'
  import { usePixelLayout } from '../composables/usePixelLayout'

  const { accountInformation } = usePixelLayout()
</script>

<template>
  <MpPopover :isKeepAlive="false">
    <MpPopoverTrigger>
      <div
        :class="
          css({
            display: {
              base: 'none',
              md: 'flex'
            },
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1,
            rounded: 'md',
            cursor: 'pointer',
            _hover: {
              bg: 'gray.50',
              transition: 'background 300ms'
            }
          })
        "
      >
        <MpAvatar :name="accountInformation.fullName" :src="accountInformation.userPhoto" />

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
      :class="
        css({
          width: '65',
          p: 0
        })
      "
    >
      <slot />
    </MpPopoverContent>
  </MpPopover>
</template>
