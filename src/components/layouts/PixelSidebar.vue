<script setup lang="tsx">
import { computed } from 'vue'
import { MpDivider, MpFlex, MpIcon, MpText, MpTooltip, css } from '@mekari/pixel3'
import { usePixelLayout } from './composables/usePixelLayout'
import { SidebarItem, SidebarItemWithChild } from './parts'
import { sidebar } from './classes'

const { isSidebarCollapsed, isSidebarChildCollapsed, useSidebar, sidebarNode, menuItems } = usePixelLayout()

const sidebarClasses = computed(() => sidebar({ isCollapsed: isSidebarCollapsed.value, isChildCollapsed: isSidebarChildCollapsed.value }))
</script>

<template>
  <aside
    ref="sidebarNode"
    data-pixel-component="PixelSidebar"
    data-slot="root"
    :class="sidebarClasses.root"
  >
    <div data-slot="rootChild" :class="sidebarClasses.rootChild">
      <div data-slot="menu" :class="sidebarClasses.menu">
        <!-- Main menu -->
        <ul
          class="sidebar-content" :class="[sidebarClasses.mainMenu]"
          :style="{ height: 'calc(100vh - 56px)' }"
        >
          <template v-for="(menu, index) in menuItems">
            <SidebarItem v-if="menu.as === 'RouterLink'" :key="index" :label="menu.name" :icon="menu.icon" :is-active="menu.isActive" :isHideLabel="isSidebarCollapsed" />
            <SidebarItemWithChild v-if="menu.as === 'group'" :key="index" label="With Grouping" :isHideLabel="isSidebarCollapsed" />
            <MpDivider v-if="menu.as === 'divider'" :key="index" />
          </template>
        </ul>

        <!-- Bottom -->
        <div :class="sidebarClasses.bottomAction">
          <MpFlex alignItems="center" gap="2" overflow="hidden">
            <MpTooltip placement="right" use-portal :label="isSidebarCollapsed ? 'Click to expand or shortcut [shift] + [x]' : 'Click to collapse or shortcut [shift] + [x]'">
              <button
                class="group"
                :class="css({
                  p: 2,
                  rounded: 'sm',
                  transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
                  cursor: 'pointer',
                  _hover: {
                    backgroundColor: 'blue.100',
                    color: 'blue.400',
                    cursor: 'pointer',
                  },
                })"
                @click="useSidebar.toggle()"
              >
                <MpIcon
                  :name="isSidebarCollapsed ? 'arrow-expand' : 'arrow-collapse'" size="sm" :class="css({
                    _groupHover: {
                      color: 'blue.400',
                    },
                  })"
                />
              </button>
            </MpTooltip>

            <MpText size="body-small" :class="css({ whiteSpace: 'nowrap', opacity: isSidebarCollapsed ? '0' : '1' })">
              Company ID : 999999
            </MpText>
          </MpFlex>
        </div>
      </div>
    </div>
  </aside>
</template>

<style>
/* custom scroll bar */
.sidebar-content::-webkit-scrollbar {
  width: 0px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}
.sidebar-content:hover::-webkit-scrollbar {
  width: 0px;
  position: absolute;
}
.sidebar-content:hover::-webkit-scrollbar-thumb {
  background: var(--colors-gray-400);
}
</style>
