<script setup lang="tsx">
import {
  MpButton,
  MpAvatar,
  MpPopover,
  MpPopoverContent,
  MpPopoverTrigger,
  MpText,
  css,
} from "@mekari/pixel3";
import { usePixelLayout } from "../composables/usePixelLayout";

const { accountInformation } = usePixelLayout();
</script>

<template>
  <MpPopover :isKeepAlive="false">
    <MpPopoverTrigger>
      <MpButton variant="ghost" size="sm">
        <MpAvatar
          :name="accountInformation.fullName"
          :src="accountInformation.userPhoto"
        />

        <div>
          <MpText weight="semiBold">
            {{ accountInformation.fullName }}
          </MpText>

          <MpText size="label-small" color="gray.600">
            {{ accountInformation.companyName }}
          </MpText>
        </div>
      </MpButton>
    </MpPopoverTrigger>

    <MpPopoverContent
      :class="
        css({
          width: '65',
          p: 0,
        })
      "
    >
      <slot />
    </MpPopoverContent>
  </MpPopover>
</template>
