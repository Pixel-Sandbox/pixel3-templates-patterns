<script setup lang="ts">
import { MpIcon, css } from '@mekari/pixel3'

const props = defineProps({
  url: String,
})

const buttonStyle = css({
  cursor: 'pointer',
  height: '9.5',
  minWidth: '9.5',
  padding: '1.5',
  rounded: 'sm',
  transition: 'all 250ms ease 0s',
  _focus: {
    boxShadow: 'outer',
    outline: 'none',
  },
  _hover: {
    background: 'gray.25',
  },
})
</script>

<template>
  <a v-tooltip="'Referral'" :href="props.url" target="_blank" :class="buttonStyle">
    <MpIcon name="gift" size="md" />
  </a>
</template>
