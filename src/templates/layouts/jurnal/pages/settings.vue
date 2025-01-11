<script setup lang="ts">
import { MpButton, MpFlex, MpText, css } from '@mekari/pixel3'
import BaseLayout from '../parts/BaseLayout.vue'
import { usePixelLayout } from '@/components/layouts/composables'

const { pixelContentAttrs, useSidebar } = usePixelLayout()

// Update sidebar collapse programmatically.
useSidebar.setCollapse(true)
</script>

<template>
  <BaseLayout :isShowChildMenu="true">
    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <MpFlex justify="space-between" align-items="center" px="6" py="1.063rem">
        <MpText size="h1" weight="semiBold">
          Title
        </MpText>

        <MpButton> Action </MpButton>
      </MpFlex>

      <div
        :class="
          css({
            bg: 'background.neutral',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderColor: 'border.default',
            roundedTopLeft: 'md',
            p: 6,
            minH: '100svh',
          })
        "
      >
        <MpText>Place content here...</MpText>
      </div>
    </main>
  </BaseLayout>
</template>

<route lang="yaml">
meta:
cover: /cover/templates/layouts/default.png
</route>
