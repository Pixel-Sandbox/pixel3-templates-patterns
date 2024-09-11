<script setup lang="ts">
import { ref } from 'vue'
import { MpDivider, MpText, css, MpFlex } from '@mekari/pixel3'
import { PixelNavbar, PixelSidebar, PixelSidebarChild } from '@/components/layouts'
import {
  Notification,
  QuickAction,
  Referral,
  SelectApp,
  SwitchAccount,
  SwitchApp,
  SwitchAppItem,
  SidebarMobile,
  SidebarItem,
  SidebarItemWithChild,
  SidebarChildItem,
  SidebarChildItemAccordion
} from '@/components/layouts/parts'
import { usePixelLayout } from '@/components/layouts/composables'
import SwitchAccountContent from './SwitchAccountContent.vue'
import NotificationContent from './NotificationContent.vue'
import { SIDEBAR_ITEMS } from './menus'

const props = defineProps({
  isShowChildMenu: Boolean
})

const sidebarChildState = ref({
  isActive: true,
  isHovered: false,
  activeMenu: '4.1'
})

const { setAccountInformation, isSidebarCollapsed, isSidebarHovered, isSidebarChildCollapsed } =
    usePixelLayout()

setAccountInformation({
  companyId: '12345678',
  companyName: 'PT Mid Solusi Nusantara',
  fullName: 'Rizal Chandra',
  userPhoto: 'https://i.pravatar.cc/300'
})

function onSelectApp(value: string) {
  console.log('SELECT APP =>', value)
}
function onSelectQuickAction(value: string) {
  console.log('SELECT QUICK ACTION =>', value)
}

function handleSelectMenu(payload: string) {
  sidebarChildState.value.activeMenu = payload
}

function compareIsActive(payload: string) {
  return sidebarChildState.value.activeMenu === payload
}
</script>

<template>
  <PixelNavbar>
    <template #left>
      <RouterLink to="/templates/layouts/general">
        <img
          src="https://cdn.mekari.design/logo/pixel/default.svg"
          alt=""
          height="56"
          width="auto"
        />
      </RouterLink>

      <MpDivider orientation="vertical" />
      <SelectApp
        :items="[
          { id: 1, label: 'HRIS (Main product)', isSelected: true },
          { id: 2, label: 'Insights' },
          { id: 3, label: 'Performance management' },
          { id: 4, label: 'People', isNew: true }
        ]"
        @update:model-value="onSelectApp"
      />
    </template>

    <template #right>
      <QuickAction
        :items="[
          {
            category: 'B U A T',
            childs: ['Penjualan', 'Pembelian', 'Biaya']
          },
          {
            category: 'T A M B A H',
            childs: ['Kontak', 'Produk', 'Gudang']
          }
        ]"
        @select="onSelectQuickAction"
      />
      <Referral url="https://mekari.com/" />

      <Notification>
        <NotificationContent />
      </Notification>

      <SwitchApp>
        <div
          :class="
            css({
              paddingBottom: '20',
              paddingX: '6'
            })
          "
        >
          <MpText :class="css({ marginBottom: '2' })">
            Hi Rizal, your apps are listed here.
          </MpText>

          <SwitchAppItem
            title="Mekari Talenta"
            description="Advanced payroll automation & HR solution"
            icon="talenta-brand"
          />
          <SwitchAppItem
            title="Mekari Jurnal"
            description="Integrated online accounting software"
            icon="jurnal-brand"
          />

          <MpDivider :class="css({ marginTop: '2', marginBottom: '2' })" />
          <MpText :class="css({ marginBottom: '2' })">
            Other apps by Mekari that might suit your business needs.
          </MpText>

          <SwitchAppItem
            title="Mekari Klikpajak"
            description="Simple tax management platform"
            icon="klikpajak-brand"
          />
          <SwitchAppItem
            title="Mekari Qontak"
            description="Complete CRM software"
            icon="jurnal-brand"
          />
          <SwitchAppItem
            title="Mekari Flex"
            description="Flexible employee benefits management"
            icon="flex-brand"
          />
          <SwitchAppItem
            title="Mekari Sign"
            description="Digital signature app"
            icon="sign-brand"
          />

          <MpDivider :class="css({ marginTop: '2', marginBottom: '2' })" />
          <MpText :class="css({ marginBottom: '2' })">More from Mekari.</MpText>

          <SwitchAppItem
            title="Mekari University"
            description="Professional learning platform"
            icon="mekari-brand"
          />
          <SwitchAppItem title="Mekari Hub" description="Launchpad" icon="mekari-brand" />
        </div>
      </SwitchApp>

      <SwitchAccount>
        <SwitchAccountContent />
      </SwitchAccount>

      <SidebarMobile />
    </template>
  </PixelNavbar>

  <div
    :class="
      css({
        bg: 'background',
        minH: '100vh',
        display: 'flex'
      })
    "
  >
    <PixelSidebar :hasChild="props.isShowChildMenu">
      <li v-for="(menu, index) in SIDEBAR_ITEMS" :key="index">
        <SidebarItem
          v-if="menu.as === 'RouterLink'"
          :as="menu.as"
          :to="menu.link"
          :label="menu.name"
          :icon="menu.icon"
          :is-active="menu.isActive"
          :isHideLabel="isSidebarCollapsed ? (isSidebarHovered ? false : true) : false"
        />
        <SidebarItemWithChild
          v-if="menu.as === 'group'"
          :key="index"
          label="With Grouping"
          :items="menu.items"
          :isHideLabel="isSidebarCollapsed ? (isSidebarHovered ? false : true) : false"
        />
        <MpDivider v-if="menu.as === 'divider'" :key="index" />
      </li>
    </PixelSidebar>

    <PixelSidebarChild v-if="props.isShowChildMenu">
      <ul
        :class="
          css({
            pt: 4,
            px: 2,
            height: 'calc(100vh - 56px)',
            width: 'full',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: '60px',
            transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
            opacity: isSidebarChildCollapsed ? '0' : '100',
            pointerEvents: isSidebarChildCollapsed ? 'none' : 'auto'
          })
        "
        :style="{ height: 'calc(100vh - 56px)' }"
      >
        <MpText
          :class="
            css({
              whiteSpace: 'nowrap',
              fontSize: 'sm',
              fontWeight: 'semiBold',
              letterSpacing: '2px',
              color: 'blue.400',
              p: 2
            })
          "
        >
          CHILD MENU
        </MpText>

        <SidebarChildItem @click="[handleSelectMenu('1')]" :isActive="compareIsActive('1')">
          Dummy menu 1
        </SidebarChildItem>

        <SidebarChildItem @click="handleSelectMenu('2')" :isActive="compareIsActive('2')">
          Dummy menu 2
        </SidebarChildItem>

        <SidebarChildItem @click="handleSelectMenu('3')" :isActive="compareIsActive('3')">
          Dummy menu 3
        </SidebarChildItem>

        <SidebarChildItemAccordion
          :defaultIsOpen="true"
          :isActive="['4.1', '4.2'].includes(sidebarChildState.activeMenu)"
        >
          <template #header> Dummy menu 4 </template>

          <template #content>
            <MpFlex flexDirection="column" pl="2">
              <SidebarChildItem
                variant="accordionItem"
                @click="handleSelectMenu('4.1')"
                :isActive="compareIsActive('4.1')"
              >
                Dummy menu 4.1
              </SidebarChildItem>
              <SidebarChildItem
                variant="accordionItem"
                @click="handleSelectMenu('4.2')"
                :isActive="compareIsActive('4.2')"
              >
                Dummy menu 4.2
              </SidebarChildItem>
            </MpFlex>
          </template>
        </SidebarChildItemAccordion>

        <SidebarChildItem @click="handleSelectMenu('5')" :isActive="compareIsActive('5')">
          Dummy menu 5
        </SidebarChildItem>
      </ul>
    </PixelSidebarChild>

    <slot />
  </div>
</template>
