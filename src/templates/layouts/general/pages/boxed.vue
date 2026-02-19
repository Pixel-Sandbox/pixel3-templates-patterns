<!--
  @description
  General layout with boxed content: grid of cards in the main area. BaseLayout and PixelContent.
-->
<script setup lang="ts">
  import { MpButton, MpFlex, MpText, css } from '@mekari/pixel3'
  import BaseLayout from '../parts/BaseLayout.vue'
  import { usePixelLayout } from '@/components/layouts/composables'

  const { pixelContentAttrs } = usePixelLayout()

  const card = css({
    bg: 'background.neutral',
    borderWidth: '1px',
    borderColor: 'border.default',
    rounded: 'md',
    p: 6,
    h: '250px'
  })
</script>

<template>
  <BaseLayout>
    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <MpFlex justify="space-between" align-items="center" px="6" py="1.063rem">
        <MpText size="h1" weight="semiBold"> Title </MpText>

        <MpButton> Action </MpButton>
      </MpFlex>

      <div
        :class="
          css({
            display: 'grid',
            gridTemplateColumns: '3',
            gap: '3',
            pr: '6',
            pb: '3'
          })
        "
      >
        <div :class="card">
          <MpText>Place content here...</MpText>
        </div>

        <div :class="card">
          <MpText>Place content here...</MpText>
        </div>

        <div :class="card">
          <MpText>Place content here...</MpText>
        </div>

        <div :class="[card, css({ gridColumn: '3' })]">
          <MpText>Place content here...</MpText>
        </div>

        <div :class="[card, css({ gridColumn: '3' })]">
          <MpText>Place content here...</MpText>
        </div>
      </div>
    </main>
  </BaseLayout>
</template>

<route lang="yaml">
meta:
cover: /cover/templates/layouts/default.png
</route>
