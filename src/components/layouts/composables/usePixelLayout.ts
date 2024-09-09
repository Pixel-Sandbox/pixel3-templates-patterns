import { onBeforeMount, onBeforeUnmount, onMounted, readonly, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { AccountInformation } from '../types'

function useLayout() {
  /** Account */
  const accountInformation = ref<AccountInformation>({
    userPhoto: 'https://i.pravatar.cc/300',
    fullName: 'Rizal Chandra',
    companyId: '12345678',
    companyName: 'PT Mid Solusi Nusantara'
  })
  function setAccountInformation(payload: AccountInformation) {
    accountInformation.value = payload
  }

  /** Sidebar */
  const isSidebarCollapsed = ref(false)
  const isSidebarHovered = ref(false)
  const isSidebarLoading = ref(false)
  const sidebarNode = ref()
  const useSidebar = {
    calculateCssVar: () => {
      document.documentElement.style.setProperty(
        '--pixel-sidebar-width',
        `${sidebarNode.value?.clientWidth || 0}px`
      )
    },
    setCollapse: (value: boolean) => (isSidebarCollapsed.value = value),
    toggle: () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value

      document.documentElement.style.setProperty(
        '--pixel-sidebar-width',
        `${isSidebarCollapsed.value ? 60 : 216}px`
      )
    },
    setLoading: (value: boolean) => {
      isSidebarLoading.value = value
    }
  }

  function handleSidebarHover(value: boolean) {
    if (!isSidebarCollapsed.value) {
      return
    }

    isSidebarHovered.value = value
  }

  /** Sidebar child */
  const isSidebarChildCollapsed = ref(false)
  const sidebarChildNode = ref()
  const useSidebarChild = {
    toggle: () => (isSidebarChildCollapsed.value = !isSidebarChildCollapsed.value)
  }

  /** Navbar */
  const isNavbarLoading = ref(false)
  const navbarNode = ref()
  const useNavbar = {
    setLoading: (value: boolean) => (isNavbarLoading.value = value),
    calculateCssVar: () => {
      document.documentElement.style.setProperty(
        '--pixel-navbar-height',
        `${navbarNode.value?.clientHeight || 56}px`
      )
    }
  }

  /** Content */
  const pixelContentAttrs = {
    style: {
      paddingTop: 'var(--pixel-navbar-height)',
      minHeight: '100svh',
      width: '100%'
    }
  }

  /** General */
  function handleKeydown(e: KeyboardEvent) {
    const body = document.getElementsByTagName('body')[0]

    // Sidebar
    if (e.shiftKey && e.keyCode === 88 && e.srcElement === body) useSidebar.toggle()

    // Sidebar Child
    if (e.shiftKey && e.keyCode === 67 && e.srcElement === body) useSidebarChild.toggle()
  }

  /** Lifecycle */
  onBeforeMount(() => {
    window.addEventListener('keydown', handleKeydown)
  })
  onMounted(() => {
    useSidebar.calculateCssVar()
    useNavbar.calculateCssVar()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    /** Account */
    accountInformation: readonly(accountInformation),
    setAccountInformation,

    /** Sidebar */
    useSidebar,
    sidebarNode,
    isSidebarLoading,
    isSidebarHovered,
    isSidebarCollapsed,
    useSidebarChild,
    handleSidebarHover,

    /** Sidebar child */
    isSidebarChildCollapsed,
    sidebarChildNode,

    /** Navbar */
    navbarNode,
    isNavbarLoading,
    useNavbar,

    // Content
    pixelContentAttrs
  }
}

export const usePixelLayout = createSharedComposable(useLayout)
