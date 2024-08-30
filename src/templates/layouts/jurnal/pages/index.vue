<script setup lang="ts">
  import { MpFlex, MpText, css, MpButton } from '@mekari/pixel3'
  import { usePixelLayout } from '@/components/layouts/composables'
  import BaseLayout from '../parts/BaseLayout.vue'
  import { useRouter } from 'vue-router'

  const { pixelContentAttrs } = usePixelLayout()
  const router = useRouter()

  router.push('/templates/layouts/jurnal/home')
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
            bg: 'white',
            borderTopWidth: '1px',
            borderLeftWidth: '1px',
            borderColor: 'gray.100',
            roundedTopLeft: 'md',
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

<route lang="yaml">
meta:
  cover: /cover/templates/jurnal/default.png
</route>
