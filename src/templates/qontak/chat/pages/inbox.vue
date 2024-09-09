<script setup lang="ts">
  import { MpText, css } from '@mekari/pixel3'
  import { usePixelLayout } from '@/components/layouts/composables'
  import BaseLayout from '../parts/BaseLayout.vue'

  const { pixelContentAttrs } = usePixelLayout()
</script>

<template>
  <BaseLayout :is-show-child-menu="true">
    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <div
        :class="
          css({
            bg: 'white',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderColor: 'gray.100',
            p: 6,
            minH: '100svh'
          })
        "
      >
        <MpText>Place content here...</MpText>
      </div>
    </main>
  </BaseLayout>
</template>

