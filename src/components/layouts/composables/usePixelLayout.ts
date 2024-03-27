import { onBeforeMount, onBeforeUnmount, onMounted, readonly, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import type { AccountInformation, MenuItem } from '../types'

function useLayout() {
  /** Account */
  const accountInformation = ref<AccountInformation>({
    userPhoto: '',
    fullName: '',
    companyId: '',
    companyName: '',
  })
  function setAccountInformation(payload: AccountInformation) {
    accountInformation.value = payload
  }

  /** Menu */
  const menuItems = ref<MenuItem[]>([])
  const setMenuItems = (menus: MenuItem[]) => {
    menuItems.value = menus
  }

  /** Sidebar */
  const isSidebarCollapsed = ref(false)
  const isSidebarLoading = ref(false)
  const sidebarNode = ref()
  const useSidebar = {
    calculateCssVar: () => {
      document.documentElement.style.setProperty('--pixel-sidebar-width', `${sidebarNode.value?.clientWidth || 0}px`)
    },
    setCollapse: (value: boolean) => isSidebarCollapsed.value = value,
    toggle: () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value

      document.documentElement.style.setProperty('--pixel-sidebar-width', `${isSidebarCollapsed.value ? 60 : 216}px`)
    },
    setLoading: (value: boolean) => {
      isSidebarLoading.value = value
    },
  }

  /** Sidebar child */
  const isSidebarChildCollapsed = ref(false)
  const sidebarChildNode = ref()
  const sidebarChildItems = ref([])
  const useSidebarChild = {
    setItems: (payload: any) => {
      console.log(payload)
    },
    toggle: () => isSidebarChildCollapsed.value = !isSidebarChildCollapsed.value,
  }

  /** Navbar */
  const isNavbarLoading = ref(false)
  const navbarNode = ref()
  const useNavbar = {
    setLoading: (value: boolean) => isNavbarLoading.value = value,
    calculateCssVar: () => {
      document.documentElement.style.setProperty('--pixel-navbar-height', `${navbarNode.value?.clientHeight || 56}px`)
    },
  }

  /** Content */
  const pixelContentAttrs = {
    style: {
      paddingTop: 'var(--pixel-navbar-height)',
      minHeight: '100svh',
      width: '100%',
    },
  }

  /** General */
  function handleKeydown(e: KeyboardEvent) {
    const body = document.getElementsByTagName('body')[0]

    // Sidebar
    if (e.shiftKey && e.keyCode === 88 && e.srcElement === body)
      useSidebar.toggle()

    // Sidebar Child
    if (sidebarChildItems.value.length && e.shiftKey && e.keyCode === 67 && e.srcElement === body)
      useSidebarChild.toggle()
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

    /** Menus */
    menuItems: readonly(menuItems),
    setMenuItems,

    /** Sidebar */
    useSidebar,
    sidebarNode,
    isSidebarLoading,
    useSidebarChild,

    /** Sidebar child */
    isSidebarChildCollapsed,
    sidebarChildNode,

    /** Navbar */
    navbarNode,
    isNavbarLoading,
    isSidebarCollapsed,
    useNavbar,

    // Content
    pixelContentAttrs,
  }
}

export const usePixelLayout = createSharedComposable(useLayout)
