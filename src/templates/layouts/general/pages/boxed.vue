<script setup lang="ts">
  import { MpFlex, MpText, css, MpButton } from '@mekari/pixel3'
  import { usePixelLayout } from '@/components/layouts/composables'
  import BaseLayout from '../parts/BaseLayout.vue'

  const { pixelContentAttrs } = usePixelLayout()

  const card = css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'gray.100',
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
            pl: '3',
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
