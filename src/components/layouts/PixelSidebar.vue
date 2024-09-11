<script setup lang="tsx">
import { computed } from 'vue'
import { MpFlex, MpIcon, MpText, MpTooltip, css } from '@mekari/pixel3'
import { usePixelLayout } from './composables/usePixelLayout'
import { sva } from '@mekari/pixel3-styled-system/css'

const props = defineProps({
  hasChild: Boolean
})
const {
  accountInformation,
  isSidebarCollapsed,
  isSidebarChildCollapsed,
  useSidebar,
  sidebarNode,
  isSidebarHovered,
  handleSidebarHover
} = usePixelLayout()

const sidebar = sva({
  slots: ['root', 'rootChild', 'menu', 'mainMenu', 'bottomAction'],
  base: {
    root: {
      flex: 'none',
      transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
      zIndex: '100',
      display: {
        base: 'none',
        md: 'block'
      }
    },
    rootChild: {
      position: 'fixed',
      display: 'flex',
      marginRight: '60px',
      transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s'
    },
    menu: {
      display: 'block',
      paddingTop: 'var(--pixel-navbar-height)',
      transitionProperty: 'width, box-shadow',
      transitionDuration: '600ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    mainMenu: {
      pt: 4,
      px: 2,
      height: 'calc(100vh - 56px)',
      width: 'full',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: '60px'
    },
    bottomAction: {
      position: 'sticky',
      bottom: '0',
      left: '0',
      p: 2,
      borderTopWidth: '1px',
      borderColor: 'gray.100',
      background: 'inherit',
      w: 'full'
    }
  },
  variants: {
    isCollapsed: {
      true: {
        root: { width: '60px' },
        menu: {
          width: '60px',
          position: 'relative'
        }
      },
      false: {
        root: { width: '216px' },
        menu: {
          width: '216px',
          position: 'absolute'
        }
      }
    },
    isChildCollapsed: {
      true: {
        root: {
          shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      },
      false: {
        root: {
          shadow: 'none'
        }
      }
    },
    hasChild: {
      true: {
        menu: {
          background: 'ash.100'
        }
      },
      false: {
        menu: {
          background: 'background'
        }
      }
    },
    isHovered: {
      true: {
        menu: {
          width: '216px!',
          shadow: 'lg'
        }
      },
      false: {}
    }
  },
  defaultVariants: {
    isCollapsed: true,
    isChildCollapsed: false,
    hasChild: false
  }
})

const sidebarClasses = computed(() =>
  sidebar({
    isCollapsed: isSidebarCollapsed.value,
    isChildCollapsed: isSidebarChildCollapsed.value,
    hasChild: props.hasChild,
    isHovered: isSidebarHovered.value
  })
)
</script>

<template>
  <aside
    ref="sidebarNode"
    data-pixel-component="PixelSidebar"
    data-slot="root"
    :class="sidebarClasses.root"
  >
    <div data-slot="rootChild" :class="sidebarClasses.rootChild">
      <div
        data-slot="menu"
        :class="sidebarClasses.menu"
        @mouseover="handleSidebarHover(true)"
        @mouseleave="handleSidebarHover(false)"
      >
        <!-- Main menu -->
        <ul
          class="sidebar-content"
          :class="[sidebarClasses.mainMenu]"
          :style="{ height: 'calc(100vh - 56px)' }"
        >
          <slot />
        </ul>

        <!-- Bottom -->
        <div :class="sidebarClasses.bottomAction">
          <MpFlex alignItems="center" gap="2" overflow="hidden">
            <MpTooltip
              placement="right"
              use-portal
              :label="isSidebarCollapsed ? 'View more (shift + X)' : 'View less (shift + X)'"
            >
              <button
                class="group"
                :class="
                  css({
                    p: 2,
                    rounded: 'sm',
                    transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1) 0s',
                    cursor: 'pointer',
                    _hover: {
                      backgroundColor: 'blue.100',
                      color: 'blue.400',
                      cursor: 'pointer'
                    }
                  })
                "
                @click="useSidebar.toggle()"
              >
                <MpIcon
                  :name="isSidebarCollapsed ? 'arrow-expand' : 'arrow-collapse'"
                  size="sm"
                  :class="
                    css({
                      _groupHover: {
                        color: 'blue.400'
                      }
                    })
                  "
                />
              </button>
            </MpTooltip>

            <MpText
              size="body-small"
              :class="
                css({
                  whiteSpace: 'nowrap',
                  opacity: isSidebarCollapsed ? (isSidebarHovered ? '1' : '0') : '1'
                })
              "
            >
              Company ID : {{ accountInformation.companyId }}
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
