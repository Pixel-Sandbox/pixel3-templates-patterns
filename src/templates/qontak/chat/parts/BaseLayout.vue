<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import {
  css,
  MpDivider,
  MpText,
  MpFlex,
  MpButton,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem
} from '@mekari/pixel3'

import { PixelNavbar, PixelSidebar, PixelSidebarChild } from '@/components/layouts'

import {
  Notification,
  SelectApp,
  SwitchAccount,
  SwitchApp,
  SwitchAppItem,
  SidebarMobile,
  SidebarItem,
  SidebarItemWithChild,
  SidebarChildItem,
  ButtonPopover
} from '@/components/layouts/parts'

import SwitchAccountContent from './SwitchAccountContent.vue'
import NotificationContent from './NotificationContent.vue'
import CreateCustomView from './CreateCustomView.vue'

import { usePixelLayout } from '@/components/layouts/composables'
import { SIDEBAR_ITEMS } from './menus'

const props = defineProps({
  isShowChildMenu: Boolean
})

const sidebarChildState = ref({
  isActive: true,
  isHovered: false,
  activeMenu: '1'
})

const {
  setAccountInformation,
  isSidebarCollapsed,
  isSidebarHovered,
  isSidebarChildCollapsed,
  useSidebar
} = usePixelLayout()

onBeforeMount(() => {
  useSidebar.setCollapse(true)
})

setAccountInformation({
  companyId: '12345678',
  companyName: 'PT Central Perk Indonesia',
  fullName: 'Christin Purnama Sari',
  userPhoto: ''
})

const isOpenCreateCustomView = ref(false)

function handleSelectMenu(payload: string) {
  sidebarChildState.value.activeMenu = payload
}

function compareIsActive(payload: string) {
  return sidebarChildState.value.activeMenu === payload
}

function onSelectApp(value: string) {
  console.log('SELECT APP =>', value)
}

function handleShowCreateCustomView(closePopoverFunc: () => void) {
  isOpenCreateCustomView.value = true
  closePopoverFunc()
}
</script>

<template>
  <PixelNavbar>
    <template #left>
      <MpFlex alignItems="center">
        <RouterLink to="/templates/qontak/chat">
          <img
            :class="css({ display: 'block', _dark: { display: 'none' } })"
            src="https://cdn.mekari.design/logo/qontak/default.svg"
            alt=""
            height="56"
            width="auto"
          >
          <img
            :class="css({ display: 'none', _dark: { display: 'block' } })"
            src="https://cdn.mekari.design/logo/qontak/white.svg"
            alt=""
            height="56"
            width="auto"
          >
        </RouterLink>
        <MpDivider orientation="vertical" :class="css({ height: 6, mr: '4', ml: '6' })" />
        <SelectApp
          :model-value="{ id: 1, label: 'Omnichannel', isSelected: true }"
          :items="[
            { id: 1, label: 'Omnichannel', isSelected: true },
            { id: 2, label: 'CRM' },
            { id: 3, label: 'Knowlegde Base', isNew: true }
          ]"
          @update:model-value="onSelectApp"
        />
      </MpFlex>
    </template>

    <template #right>
      <MpButton
        v-tooltip="'Help center'"
        aria-label="help button"
        left-icon="help"
        variant="ghost"
      />

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
            Hi Christiin, your apps are listed here.
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
        bg: 'background.surface',
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
          :label="menu.name"
          :items="menu.items"
          :to="menu.link"
          :icon="menu.icon"
          :isActive="menu.isActive"
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
        <MpFlex justify="space-between" alignItems="center" height="36px">
          <MpText
            :class="
              css({
                letterSpacing: '2.88px',
                p: 2
              })
            "
            size="label-small"
            weight="semiBold"
            color="text.link"
          >
            INBOX
          </MpText>
          <MpFlex gap="1">
            <MpButton aria-label="add button" left-icon="add" variant="ghost" size="sm" :class="css({ color: 'icon.brand'})" />
            <MpButton aria-label="search button" left-icon="search" variant="ghost" size="sm"  :class="css({ color: 'icon.brand'})" />
          </MpFlex>
        </MpFlex>

        <SidebarChildItem
          @click="[handleSelectMenu('1')]"
          :isActive="compareIsActive('1')"
          counter="99+"
        >
          All inboxes
        </SidebarChildItem>

        <SidebarChildItem @click="handleSelectMenu('2')" :isActive="compareIsActive('2')" counter="4">
          Your conversations
        </SidebarChildItem>

        <SidebarChildItem
          @click="handleSelectMenu('3')"
          :isActive="compareIsActive('3')"
          counter="2"
        >
          Unassigned
        </SidebarChildItem>

        <SidebarChildItem
          @click="handleSelectMenu('4')"
          :isActive="compareIsActive('4')"
          counter="10"
        >
          Assigned
        </SidebarChildItem>
        <SidebarChildItem @click="handleSelectMenu('5')" :isActive="compareIsActive('5')">
          Resolved
        </SidebarChildItem>
        <MpDivider :class="css({ marginTop: '2', marginBottom: '2' })" />

        <MpFlex justify="space-between" alignItems="center" height="36px">
          <MpText
            :class="
              css({
                letterSpacing: '2px',
                p: 2
              })
            "
            size="label-small"
            weight="semiBold"
            color="text.link"
          >
            CUSTOM VIEW
          </MpText>

          <MpPopover
            id="popover-custom-view"
            trigger="click"
            placement="right-start"
            :is-close-on-select="true"
            v-slot="{ onClosePopover }"
          >
            <MpPopoverTrigger>
              <MpButton
                aria-label="custom view button"
                left-icon="add"
                variant="ghost"
                size="sm"
                :class="css({ color: 'icon.brand'})"
              ></MpButton>
            </MpPopoverTrigger>

            <MpPopoverContent
              :class="
                css({
                  width: '176px',
                  maxWidth: '280px',
                  maxHeight: '196px',
                  overflowY: 'auto'
                })
              "
            >
              <MpPopoverList>
                <MpPopoverListItem> 🤯 L2 follow up </MpPopoverListItem>
                <MpPopoverListItem> 🥊 Baku hantam </MpPopoverListItem>
                <MpPopoverListItem> 💰️ Large enterprise </MpPopoverListItem>
                <MpPopoverListItem> ⏰ SLA at risk </MpPopoverListItem>
                <MpPopoverListItem> 🛠️ Tech support </MpPopoverListItem>
              </MpPopoverList>
              <ButtonPopover @click="handleShowCreateCustomView(onClosePopover)"
                >Create a view</ButtonPopover
              >
            </MpPopoverContent>
          </MpPopover>
        </MpFlex>
        <SidebarChildItem
          @click="handleSelectMenu('7')"
          :isActive="compareIsActive('7')"
          counter="12"
        >
          🎧 Customer support
        </SidebarChildItem>
        <SidebarChildItem
          @click="handleSelectMenu('8')"
          :isActive="compareIsActive('8')"
          counter="2"
        >
          💰 Sales
        </SidebarChildItem>
      </ul>
    </PixelSidebarChild>

    <CreateCustomView :is-open="isOpenCreateCustomView" @close="isOpenCreateCustomView = false" />
    <slot />
  </div>
</template>
