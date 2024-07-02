<script setup lang="tsx">
  import { useSlots } from 'vue'
  import { css } from '@mekari/pixel3'
  import { usePixelLayout } from './composables/usePixelLayout'

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
    data-slot="root"
    :class="
      css({
        position: 'fixed',
        zIndex: '1700',
        width: 'full',
        bg: 'white',
        px: '6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '1px',
        borderColor: 'gray.100',
        py: '2',
        height: '56px'
      })
    "
  >
    <div
      data-slot="leftContent"
      :class="
        css({
          display: 'flex',
          gap: '2',
          alignItems: 'center'
        })
      "
    >
      <slot v-if="hasSlot('left')" name="left" />
    </div>

    <div
      data-slot="rightContent"
      :class="
        css({
          display: 'flex',
          gap: '2',
          alignItems: 'center'
        })
      "
    >
      <slot v-if="hasSlot('right')" name="right" />
    </div>
  </nav>
</template>
