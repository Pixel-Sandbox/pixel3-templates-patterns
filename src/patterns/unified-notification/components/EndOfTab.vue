<template>
  <MpFlex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap="2"
    py="3"
  >
    <MpIcon
      name="inbox"
      variant="fill"
      :color="isNextTheme ? 'icon.brand' : 'blue.400'"
    />
    <MpText
      size="label-small"
      :color="isNextTheme ? 'text.secondary' : 'gray.600'"
    >
      <slot>
        You have viewed all your notifications from the past 90 days.
      </slot>
    </MpText>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpIcon, MpText } from '@mekari/pixel3';
import { usePixelTheme } from '@mekari/pixel3-utils';

const { isNextTheme } = usePixelTheme();
</script>
