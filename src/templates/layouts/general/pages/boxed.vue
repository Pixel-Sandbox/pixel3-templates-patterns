<script setup lang="ts">
import { MpDivider, MpFlex, MpText, css } from '@mekari/pixel3'
import { PixelNavbar, PixelSidebar } from '@/components/layouts'
import { JurnalActivityLog, Notification, QuickAction, Referral, SelectApp } from '@/components/layouts/parts'
import { usePixelLayout } from '@/components/layouts/composables'

const { pixelContentAttrs } = usePixelLayout()

const mainContentClass = css({
  bg: 'white',
  borderTopWidth: '1px',
  borderLeftWidth: '1px',
  borderColor: 'gray.100',
  roundedTopLeft: 'md',
  p: 6,
  minH: '100svh',
})

const apps = [
  {
    id: 1,
    label: 'HRIS (Main product)',
    isSelected: true,
  },
  {
    id: 2,
    label: 'Insights',
  },
  {
    id: 3,
    label: 'Performance management',
  },
  {
    id: 4,
    label: 'People',
    isNew: true,
  },
]
function onSelectApp(value: any) {
  console.log('SELECT APP : ', value)
}
</script>

<template>
  <PixelNavbar>
    <template #left>
      <MpDivider orientation="vertical" />
      <SelectApp :items="apps" @update:model-value="onSelectApp" />
    </template>

    <template #right>
      <QuickAction />
      <Referral url="https://mekari.com/" />

      <JurnalActivityLog>
        Activity log content
      </JurnalActivityLog>

      <Notification>
        Notification content
      </Notification>
    </template>
  </PixelNavbar>

  <div
    :class="css({
      bg: 'background',
      minH: '100vh',
      display: 'flex',
    })"
  >
    <PixelSidebar />
    <!-- <PixelSidebarChild /> -->

    <main data-pixel-component="PixelContent" v-bind="pixelContentAttrs">
      <MpFlex justify="space-between" alignItems="center" px="6" py="1.063rem">
        <MpText size="h1" weight="semiBold">
          Title
        </MpText>
      </MpFlex>

      <div :class="mainContentClass">
        Content
      </div>
    </main>
  </div>
</template>
