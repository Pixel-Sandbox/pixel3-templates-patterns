<script setup lang="ts">
import { MpDivider, MpFlex, MpText, css } from '@mekari/pixel3'
import { PixelNavbar, PixelSidebar } from '@/components/layouts'
import { JurnalActivityLog, Notification, QuickAction, Referral, SelectApp } from '@/components/layouts/parts'
import { usePixelLayout } from '@/components/layouts/composables'

const { pixelContentAttrs, setMenuItems, setAccountInformation } = usePixelLayout()

const mainContentClass = css({
  bg: 'white',
  borderTopWidth: '1px',
  borderLeftWidth: '1px',
  borderColor: 'gray.100',
  roundedTopLeft: 'md',
  p: 6,
  minH: '100svh',
})

const appItems = [
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
  console.log('SELECT APP =>', value)
}
function onSelectQuickAction(value: string) {
  console.log('SELECT QUICK ACTION =>', value)
}

const quickActionItem = [
  {
    category: 'B U A T',
    childs: ['Penjualan', 'Pembelian', 'Biaya'],
  },
  {
    category: 'T A M B A H',
    childs: ['Kontak', 'Produk', 'Gudang'],
  },
]

setAccountInformation({
  fullName: 'Rizal Chandra',
  companyName: 'PT Mid Solusi Nusantara',
  companyId: '12345678',
  userPhoto: 'https://i.pravatar.cc/300',
})
setMenuItems([
  {
    id: 1,
    as: 'RouterLink',
    name: 'Layout Default',
    icon: 'table-view-field',
    link: '/',
    isActive: true,
  },
  {
    id: 2,
    as: 'RouterLink',
    name: 'Layout Boxed',
    icon: 'empty',
    link: '/boxed',
  },
  {
    id: 3,
    as: 'RouterLink',
    name: 'Layout Child Menu',
    icon: 'empty',
    link: '/child-menu',
  },
  {
    id: 3,
    as: 'group',
    name: 'With Grouping',
    icon: 'empty',
    link: '',
  },
  {
    id: 4,
    as: 'divider',
    name: 'With Grouping',
    icon: 'empty',
    link: '',
  },
])
</script>

<template>
  <PixelNavbar>
    <template #left>
      <MpDivider orientation="vertical" />
      <SelectApp :items="appItems" @update:model-value="onSelectApp" />
    </template>

    <template #right>
      <QuickAction :items="quickActionItem" @select="onSelectQuickAction" />
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
      <MpFlex justify="space-between" align-items="center" px="6" py="1.063rem">
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

<route lang="yaml">
meta:
  cover: /cover/templates/layouts/default.png
</route>
