<script setup lang="ts">
  import { MpButton } from '@mekari/pixel3'

  const props = defineProps({
    url: String
  })
</script>

<template>
  <MpButton
    as="a"
    v-tooltip="'Referral'"
    aria-label="referral button"
    left-icon="gift"
    variant="ghost"
    :href="props.url"
    target="_blank"
  />
</template>
