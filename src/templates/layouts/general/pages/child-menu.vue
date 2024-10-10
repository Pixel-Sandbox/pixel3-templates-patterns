<script setup lang="ts">
  import { MpFlex, MpText, css } from '@mekari/pixel3'
  import { usePixelLayout } from '@/components/layouts/composables'
  import BaseLayout from '../parts/BaseLayout.vue'

  const { pixelContentAttrs } = usePixelLayout()

  const mainContentClass = css({
    bg: 'white',
    borderTopWidth: '1px',
    borderLeftWidth: '1px',
    borderColor: 'gray.100',
    roundedTopLeft: 'md',
    p: 6,
    minH: '100svh'
  })
</script>

<template>
  <BaseLayout :isShowChildMenu="true">
    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <MpFlex justify="space-between" align-items="center" px="6" py="1.063rem">
        <MpText size="h1" weight="semiBold"> Title </MpText>
      </MpFlex>

      <div :class="mainContentClass">Content</div>
    </main>
  </BaseLayout>
</template>

<route lang="yaml">
meta:
  cover: /cover/templates/layouts/default.png
</route>
