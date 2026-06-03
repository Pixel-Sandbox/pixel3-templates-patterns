import { ref, readonly, type DeepReadonly, type Ref } from 'vue'

/**
 * Sidebar control actions for toggling, opening, and closing a sidebar panel.
 */
interface SidebarActions {
  /** Toggle the sidebar open/closed state */
  toggle: () => void
  /** Open the sidebar */
  open: () => void
  /** Close the sidebar */
  close: () => void
}

/**
 * Return type for the useAppSidebar composable.
 * Provides reactive state and control actions for the application's sidebar panels.
 */
export interface UseAppSidebarReturn {
  /**
   * Left sidebar (navigation panel) state.
   * @readonly - Use `left.toggle()`, `left.open()`, or `left.close()` to modify.
   */
  isLeftOpen: DeepReadonly<Ref<boolean>>
  /**
   * Right sidebar (AI assistant panel) state.
   * @readonly - Use `right.toggle()`, `right.open()`, or `right.close()` to modify.
   */
  isRightOpen: DeepReadonly<Ref<boolean>>
  /**
   * Control actions for the left sidebar (navigation panel).
   */
  left: SidebarActions
  /**
   * Control actions for the right sidebar (AI assistant panel).
   */
  right: SidebarActions
}

// Shared state for sidebars (singleton pattern)
const leftOpen = ref(false)
const rightOpen = ref(false)

/**
 * Composable for managing the application's sidebar states.
 *
 * This composable provides a unified interface to control both the left sidebar
 * (navigation panel) and the right sidebar (AI assistant panel) in the enterprise layout.
 *
 * Uses singleton pattern - state is shared across all component instances.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { isLeftOpen, isRightOpen, left, right } = useAppSidebar()
 *
 * // Toggle sidebars
 * left.toggle()
 * right.open()
 * </script>
 *
 * <template>
 *   <aside v-if="isLeftOpen">Navigation</aside>
 *   <aside v-if="isRightOpen">AI Assistant</aside>
 * </template>
 * ```
 */
export function useAppSidebar(): UseAppSidebarReturn {
  const left: SidebarActions = {
    toggle: () => {
      leftOpen.value = !leftOpen.value
    },
    open: () => {
      leftOpen.value = true
    },
    close: () => {
      leftOpen.value = false
    },
  }

  const right: SidebarActions = {
    toggle: () => {
      rightOpen.value = !rightOpen.value
    },
    open: () => {
      rightOpen.value = true
    },
    close: () => {
      rightOpen.value = false
    },
  }

  return {
    isLeftOpen: readonly(leftOpen),
    isRightOpen: readonly(rightOpen),
    left,
    right,
  }
}
