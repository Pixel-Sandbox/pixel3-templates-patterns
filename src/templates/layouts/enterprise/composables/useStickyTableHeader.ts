import { ref, computed, onMounted, onBeforeUnmount, type Ref, type ComputedRef } from 'vue'

export interface StickyTableHeaderOptions {
  /** Ref to the table wrapper container */
  tableWrapperRef: Ref<HTMLElement | null>
  /** Ref to the main scrollable table container element */
  tableContainerRef: Ref<HTMLElement | null>
  /** Ref to the sticky header scroll container */
  stickyHeaderRef: Ref<HTMLElement | null>
  /** Ref to the table element for visibility detection */
  tableRef: Ref<HTMLElement | null>
  /** Ref to the header row for threshold detection */
  headerRowRef: Ref<HTMLElement | null>
  /** Optional top offset for sticky positioning (default: '0px') */
  topOffset?: string
  /** Debounce time for resize observer in ms (default: 25) */
  resizeDebounce?: number
}

export interface StickyTableHeaderReturn {
  /** Whether the sticky header should be visible */
  isStickyVisible: ComputedRef<boolean>
  /** Current container width for sticky header sizing */
  containerWidth: Ref<number>
  /** Top offset string for CSS positioning */
  topOffset: string
  /** Manually trigger width recalculation */
  recalculateWidth: () => void
  /** Cleanup function (called automatically on unmount) */
  cleanup: () => void
}

export function useStickyTableHeader(options: StickyTableHeaderOptions): StickyTableHeaderReturn {
  const {
    tableWrapperRef,
    tableContainerRef,
    stickyHeaderRef,
    tableRef,
    headerRowRef,
    topOffset = '0px',
    resizeDebounce = 25
  } = options

  // Reactive state
  const containerWidth = ref(0)
  const isHeaderAboveThreshold = ref(false)
  const isTableVisible = ref(false)

  // Observers
  let headerObserver: IntersectionObserver | null = null
  let tableObserver: IntersectionObserver | null = null
  let resizeObserver: ResizeObserver | null = null
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null
  let lastWidth: number | null = null
  let scrollCleanup: (() => void) | null = null

  // Computed visibility
  const isStickyVisible = computed(() => {
    return isHeaderAboveThreshold.value && isTableVisible.value
  })

  /**
   * Helper to get DOM element from ref (handles Vue component refs)
   */
  function getElement(refValue: HTMLElement | { $el?: HTMLElement } | null): HTMLElement | null {
    if (!refValue) return null
    if (refValue instanceof HTMLElement) return refValue
    return (refValue as { $el?: HTMLElement }).$el ?? null
  }

  /**
   * Calculate container width from table container
   */
  function recalculateWidth() {
    const el = getElement(tableContainerRef.value)
    if (el) {
      containerWidth.value = el.getBoundingClientRect().width
    }
  }

  /**
   * Setup IntersectionObservers for visibility detection
   */
  function setupIntersectionObservers() {
    // Table visibility observer
    tableObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        isTableVisible.value = entry.isIntersecting
      },
      { threshold: 0 }
    )

    // Header threshold observer
    headerObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        isHeaderAboveThreshold.value = !entry.isIntersecting
      },
      { threshold: 0 }
    )

    // Start observing
    const tableEl = getElement(tableRef.value)
    const headerEl = getElement(headerRowRef.value)

    if (tableEl) tableObserver.observe(tableEl)
    if (headerEl) headerObserver.observe(headerEl)
  }

  /**
   * Setup ResizeObserver for container resize handling
   */
  function setupResizeObserver() {
    resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (resizeTimeout) clearTimeout(resizeTimeout)

      resizeTimeout = setTimeout(() => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width
          if (newWidth !== lastWidth) {
            lastWidth = newWidth
            recalculateWidth()
          }
        }
      }, resizeDebounce)
    })

    const wrapperEl = getElement(tableWrapperRef.value)
    if (wrapperEl) resizeObserver.observe(wrapperEl)
  }

  /**
   * Sync horizontal scroll between main table and sticky header
   */
  function setupScrollSync() {
    const mainEl = getElement(tableContainerRef.value)
    const stickyEl = stickyHeaderRef.value

    if (!mainEl || !stickyEl) return

    const onScroll = () => {
      stickyEl.scrollLeft = mainEl.scrollLeft
    }

    mainEl.addEventListener('scroll', onScroll, { passive: true })
    scrollCleanup = () => {
      mainEl.removeEventListener('scroll', onScroll)
    }
  }

  /**
   * Cleanup all observers and listeners
   */
  function cleanup() {
    headerObserver?.disconnect()
    tableObserver?.disconnect()
    resizeObserver?.disconnect()
    scrollCleanup?.()
    if (resizeTimeout) clearTimeout(resizeTimeout)
  }

  // Lifecycle
  onMounted(() => {
    // Delay to ensure DOM is ready
    setTimeout(() => {
      recalculateWidth()
      setupIntersectionObservers()
      setupResizeObserver()
      setupScrollSync()
    }, 100)
  })

  onBeforeUnmount(cleanup)

  return {
    isStickyVisible,
    containerWidth,
    topOffset,
    recalculateWidth,
    cleanup
  }
}
