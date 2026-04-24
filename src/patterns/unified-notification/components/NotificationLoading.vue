<template>
  <MpFlex flexDirection="column" width="full" px="2">
    <MpFlex v-for="index in 3" :key="index" gap="3" py="3" px="2">
      <MpSkeleton height="36px" width="36px" borderRadius="full" />
      <MpFlex flexDirection="column" gap="1">
        <MpSkeleton height="12px" width="171px" borderRadius="full" />
        <MpSkeleton height="16px" width="312px" borderRadius="full" />
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { MpFlex, MpSkeleton } from '@mekari/pixel3';
</script>
