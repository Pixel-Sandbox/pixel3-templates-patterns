<script setup lang="ts">
import { css, MpText } from "@mekari/pixel3";
</script>

<template>
  <button
    :class="
      css({
        cursor: 'pointer',
        position: 'sticky',
        bottom: '0',
        width: 'full',
        py: 2,
        borderTopWidth: '1px',
        borderColor: 'gray.100',
        background: 'white',
      })
    "
    :style="{
      borderBottomLeftRadius: 'var(--mp-radii-md)',
      borderBottomRightRadius: 'var(--mp-radii-md)'
    }"
  >
    <MpText weight="semiBold" color="blue.400"><slot></slot></MpText>
  </button>
</template>
