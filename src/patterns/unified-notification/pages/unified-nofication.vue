<template>
  <nav
    data-pixel-component="PixelNavbar"
    :class="
      css({
        position: 'fixed',
        zIndex: '101',
        width: 'full',
        bg: 'background.stage',
        px: '6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: '1px',
        borderColor: 'border.default',
        py: '2',
        height: '56px'
      })
    "
  >
    <div
      :class="
        css({
          display: 'flex',
          gap: '2',
          alignItems: 'center'
        })
      "
    >
      <RouterLink to="/">
        <img
          :class="css({ display: 'block', _dark: { display: 'none' } })"
          src="https://cdn.mekari.design/logo/qontak/default.svg"
          alt=""
          height="56"
          width="auto"
        />
        <img
          :class="css({ display: 'none', _dark: { display: 'block' } })"
          src="https://cdn.mekari.design/logo/qontak/white.svg"
          alt=""
          height="56"
          width="auto"
        />
      </RouterLink>
    </div>

    <div
      :class="
        css({
          display: 'flex',
          gap: '2',
          alignItems: 'center'
        })
      "
    >
      <NotificationCenter />
    </div>
  </nav>
  <section
    :class="
      css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg',
        height: '100vh',
        width: 'full',
        p: 'lg',
        pt: 'calc(56px + 24px)',
        overflowY: 'auto'
      })
    "
  >
    <NotificationIconsShowcase />
    <NotificationItemShowcase />
  </section>
</template>

<script setup lang="tsx">
  import { css } from '@mekari/pixel3'
  import NotificationCenter from '../NotificationCenter.vue'
  import NotificationIconsShowcase from '../showcase/NotificationIconsShowcase.vue'
  import NotificationItemShowcase from '../showcase/NotificationItemShowcase.vue'
</script>
