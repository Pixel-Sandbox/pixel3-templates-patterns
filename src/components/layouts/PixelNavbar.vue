<script setup lang="tsx">
import type { PropType } from 'vue'
import { useSlots } from 'vue'
import { MpFlex, css } from '@mekari/pixel3'
import { usePixelLayout } from './composables/usePixelLayout'

const props = defineProps({
  logoUrl: {
    type: String as PropType<string>,
    default: 'https://cdn.mekari.design/logo/pixel/default.svg',
  },
})

const slots = useSlots()
function hasSlot(name: string) {
  return !!slots[name]
}
const { navbarNode } = usePixelLayout()
</script>

<template>
  <nav
    ref="navbarNode"
    data-pixel-component="PixelNavbar"
    :class="
      css({
        position: 'fixed',
        zIndex: '101',
        width: 'full',
        bg: 'white',
        px: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '1px',
        borderColor: 'gray.100',
        py: 2,
        height: '56px'
      })
    "
  >
    <MpFlex gap="6" alignItems="center">
      <img :src="props.logoUrl" alt="" height="56" width="auto" />

      <slot v-if="hasSlot('left')" name="left" />
    </MpFlex>

    <MpFlex gap="2" alignItems="center">
      <slot v-if="hasSlot('right')" name="right" />
    </MpFlex>
  </nav>
</template>
