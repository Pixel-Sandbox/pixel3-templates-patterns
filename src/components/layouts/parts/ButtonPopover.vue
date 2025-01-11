<script setup lang="ts">
import { css, MpText } from '@mekari/pixel3';
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
        background: 'background.brand.bold',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
      })
    "
  >
    <MpText weight="semiBold" color="text.inverse"><slot></slot></MpText>
  </button>
</template>
