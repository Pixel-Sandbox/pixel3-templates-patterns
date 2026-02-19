import { ref, computed } from 'vue'

/**
 * Configuration for a single table column.
 * Defines the column's identity, display properties, and pinning behavior.
 */
export interface ColumnConfig {
  /** Unique identifier for the column. Used for lookups and as a key in loops. */
  id: string
  /** Display label shown in the column header. */
  label: string
  /** Current width of the column in pixels. */
  width: number
  /** Minimum allowed width when resizing. Defaults to 40px if not specified. */
  minWidth?: number
  /** Pin position for sticky columns. `null` means the column is not pinned. */
  pinned?: 'left' | 'right' | null
}

/**
 * Options for initializing the useTableColumns composable.
 */
export interface UseTableColumnsOptions {
  /** Initial column configurations. Each column will be cloned to avoid mutation. */
  columns: ColumnConfig[]
  /** Callback fired whenever columns are modified (resize, reorder, pin). */
  onColumnsChange?: (columns: ColumnConfig[]) => void
}

/**
 * Composable for managing table column state including resize, reorder, and pinning.
 *
 * Provides reactive column management with support for:
 * - Column resizing via drag handles
 * - Column reordering via drag and drop
 * - Column pinning to left or right edges (sticky positioning)
 * - Automatic style generation for pinned columns with shadows
 *
 * Uses singleton pattern - state is shared across all component instances.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const { columns, startResize, toggleColumnPin, getColumnStyle } = useTableColumns({
 *   columns: [
 *     { id: 'name', label: 'Name', width: 200 },
 *     { id: 'email', label: 'Email', width: 250 },
 *   ],
 *   onColumnsChange: (cols) => console.log('Columns changed:', cols)
 * })
 * </script>
 * ```
 */
export function useTableColumns(options: UseTableColumnsOptions) {
  const columns = ref<ColumnConfig[]>(options.columns.map(c => ({ ...c })))

  // Resize state
  const isResizing = ref(false)
  const resizingColumnId = ref<string | null>(null)
  const resizeStartX = ref(0)
  const resizeStartWidth = ref(0)

  // Drag reorder state
  const isDragging = ref(false)
  const dragColumnId = ref<string | null>(null)
  const dragOverColumnId = ref<string | null>(null)

  /**
   * Get column by ID
   */
  function getColumn(id: string) {
    return columns.value.find(col => col.id === id)
  }

  /**
   * Get column index by ID
   */
  function getColumnIndex(id: string) {
    return columns.value.findIndex(col => col.id === id)
  }

  /**
   * Update column width (respects minWidth)
   */
  function updateColumnWidth(id: string, width: number) {
    const index = getColumnIndex(id)
    if (index !== -1) {
      const column = columns.value[index]
      const minWidth = column.minWidth ?? 40 // Default min width
      columns.value[index] = { ...column, width: Math.max(minWidth, width) }
      columns.value = [...columns.value] // Trigger reactivity
      options.onColumnsChange?.(columns.value)
    }
  }

  /**
   * Start resize - called on mousedown on resize handle
   */
  function startResize(columnId: string, event: MouseEvent) {
    const column = getColumn(columnId)
    if (!column) return

    isResizing.value = true
    resizingColumnId.value = columnId
    resizeStartX.value = event.clientX
    resizeStartWidth.value = column.width

    // Add global listeners
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopResize)

    // Prevent text selection during drag
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
  }

  /**
   * Handle mouse move during resize
   */
  function onMouseMove(event: MouseEvent) {
    if (!isResizing.value || !resizingColumnId.value) return

    const delta = event.clientX - resizeStartX.value
    const newWidth = resizeStartWidth.value + delta

    updateColumnWidth(resizingColumnId.value, newWidth)
  }

  /**
   * Stop resize - called on mouseup
   */
  function stopResize() {
    isResizing.value = false
    resizingColumnId.value = null

    // Remove global listeners
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', stopResize)

    // Restore cursor and selection
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }

  /**
   * Toggle column pin - moves column to left/right edge
   */
  function toggleColumnPin(id: string, position: 'left' | 'right' | null) {
    const index = getColumnIndex(id)
    if (index === -1) return

    const column = columns.value[index]
    const isUnpinning = column.pinned === position

    // Update the pinned state
    const updatedColumn = { ...column, pinned: isUnpinning ? null : position }

    // Remove column from current position
    const newColumns = [...columns.value]
    newColumns.splice(index, 1)

    if (isUnpinning) {
      // If unpinning, put it back in a reasonable position (after checkbox and left-pinned columns)
      const checkboxIndex = newColumns.findIndex(c => c.id === '__checkbox')
      const leftPinnedCount = newColumns.filter(c => c.pinned === 'left').length
      const unpinnedStartIndex = checkboxIndex !== -1
        ? Math.max(checkboxIndex + 1, leftPinnedCount)
        : leftPinnedCount
      newColumns.splice(unpinnedStartIndex, 0, updatedColumn)
    } else if (position === 'left') {
      // Pin to left: insert after existing left-pinned columns (and after checkbox if it exists)
      const checkboxIndex = newColumns.findIndex(c => c.id === '__checkbox')
      const leftPinnedCount = newColumns.filter(c => c.pinned === 'left').length
      const insertIndex = checkboxIndex !== -1 ? Math.max(checkboxIndex + 1, leftPinnedCount) : leftPinnedCount
      newColumns.splice(insertIndex, 0, updatedColumn)
    } else if (position === 'right') {
      // Pin to right: insert before existing right-pinned columns (and before actions if it exists)
      const actionsIndex = newColumns.findIndex(c => c.id === 'actions')
      const rightPinnedCount = newColumns.filter(c => c.pinned === 'right').length
      const insertIndex = actionsIndex !== -1
        ? Math.min(actionsIndex, newColumns.length - rightPinnedCount)
        : newColumns.length - rightPinnedCount
      newColumns.splice(insertIndex, 0, updatedColumn)
    }

    columns.value = newColumns
    options.onColumnsChange?.(columns.value)
  }

  /**
   * Start dragging a column for reordering
   */
  function startDrag(columnId: string) {
    isDragging.value = true
    dragColumnId.value = columnId
  }

  /**
   * Called when dragging over another column
   */
  function onDragOver(columnId: string) {
    if (!isDragging.value || dragColumnId.value === columnId) return
    dragOverColumnId.value = columnId
  }

  /**
   * Drop column to reorder
   */
  function dropColumn(targetColumnId: string) {
    if (!isDragging.value || !dragColumnId.value) return

    const fromIndex = getColumnIndex(dragColumnId.value)
    const toIndex = getColumnIndex(targetColumnId)

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const newColumns = [...columns.value]
      const [removed] = newColumns.splice(fromIndex, 1)
      newColumns.splice(toIndex, 0, removed)
      columns.value = newColumns
      options.onColumnsChange?.(columns.value)
    }

    // Reset drag state
    isDragging.value = false
    dragColumnId.value = null
    dragOverColumnId.value = null
  }

  /**
   * Cancel drag operation
   */
  function cancelDrag() {
    isDragging.value = false
    dragColumnId.value = null
    dragOverColumnId.value = null
  }

  /**
   * Move column to a specific index
   */
  function moveColumn(columnId: string, toIndex: number) {
    const fromIndex = getColumnIndex(columnId)
    if (fromIndex === -1 || fromIndex === toIndex) return

    const newColumns = [...columns.value]
    const [removed] = newColumns.splice(fromIndex, 1)
    newColumns.splice(toIndex, 0, removed)
    columns.value = newColumns
    options.onColumnsChange?.(columns.value)
  }

  /**
   * Get columns pinned to left (in order)
   */
  const pinnedLeftColumns = computed(() => {
    return columns.value.filter(col => col.pinned === 'left')
  })

  /**
   * Get columns pinned to right (in order)
   */
  const pinnedRightColumns = computed(() => {
    return columns.value.filter(col => col.pinned === 'right')
  })

  /**
   * Check if column is the last (rightmost) pinned-left column
   */
  function isLastPinnedLeft(columnId: string): boolean {
    const pinnedLeft = columns.value.filter(c => c.pinned === 'left')
    if (pinnedLeft.length === 0) return false
    return pinnedLeft[pinnedLeft.length - 1].id === columnId
  }

  /**
   * Check if column is the first (leftmost) pinned-right column
   */
  function isFirstPinnedRight(columnId: string): boolean {
    const pinnedRight = columns.value.filter(c => c.pinned === 'right')
    if (pinnedRight.length === 0) return false
    return pinnedRight[0].id === columnId
  }

  /**
   * Calculate left offset for a pinned-left column
   */
  function getPinnedLeftOffset(columnId: string): number {
    let offset = 0
    for (const col of columns.value) {
      if (col.id === columnId) break
      if (col.pinned === 'left') {
        offset += col.width
      }
    }
    return offset
  }

  /**
   * Calculate right offset for a pinned-right column
   */
  function getPinnedRightOffset(columnId: string): number {
    let offset = 0
    const reversedColumns = [...columns.value].reverse()
    for (const col of reversedColumns) {
      if (col.id === columnId) break
      if (col.pinned === 'right') {
        offset += col.width
      }
    }
    return offset
  }

  /**
   * Get style object for a column (header or cell)
   */
  function getColumnStyle(columnId: string): Record<string, string> {
    const column = getColumn(columnId)
    if (!column) return {}

    const style: Record<string, string> = {
      width: `${column.width}px`,
      minWidth: `${column.width}px`,
      maxWidth: `${column.width}px`,
    }

    if (column.pinned === 'left') {
      style.position = 'sticky'
      style.left = `${getPinnedLeftOffset(columnId)}px`
      style.zIndex = '10'
      style.backgroundColor = 'var(--mp-colors-gray-25)'
      // Only add shadow on the rightmost pinned-left column
      if (isLastPinnedLeft(columnId)) {
        style.boxShadow = 'inset -2px 0px var(--mp-colors-border-default)'
      }
    } else if (column.pinned === 'right') {
      style.position = 'sticky'
      style.right = `${getPinnedRightOffset(columnId)}px`
      style.zIndex = '10'
      style.backgroundColor = 'var(--mp-colors-gray-25)'
      // Only add shadow on the leftmost pinned-right column
      if (isFirstPinnedRight(columnId)) {
        style.boxShadow = 'inset 2px 0px var(--mp-colors-border-default)'
      }
    }

    return style
  }

  /**
   * Get style for table body cell (slightly different bg)
   */
  function getCellStyle(columnId: string): Record<string, string> {
    const column = getColumn(columnId)
    if (!column) return {}

    const style: Record<string, string> = {
      width: `${column.width}px`,
      minWidth: `${column.width}px`,
      maxWidth: `${column.width}px`,
      verticalAlign: 'top',
      paddingTop: '8px',
      paddingBottom: '8px',
    }

    if (column.pinned === 'left') {
      style.position = 'sticky'
      style.left = `${getPinnedLeftOffset(columnId)}px`
      style.zIndex = '10'
      style.backgroundColor = 'var(--mp-colors-white)'
      // Only add shadow on the rightmost pinned-left column
      if (isLastPinnedLeft(columnId)) {
        style.boxShadow = 'inset -2px 0px var(--mp-colors-border-default)'
      }
    } else if (column.pinned === 'right') {
      style.position = 'sticky'
      style.right = `${getPinnedRightOffset(columnId)}px`
      style.zIndex = '10'
      style.backgroundColor = 'var(--mp-colors-white)'
      // Only add shadow on the leftmost pinned-right column
      if (isFirstPinnedRight(columnId)) {
        style.boxShadow = 'inset 2px 0px var(--mp-colors-border-default)'
      }
    }

    return style
  }

  /**
   * Get total width of all columns
   */
  const totalWidth = computed(() => {
    return columns.value.reduce((sum, col) => sum + col.width, 0)
  })

  /**
   * Get array of column widths (for syncing with sticky header)
   */
  const columnWidths = computed(() => {
    return columns.value.map(col => col.width)
  })

  return {
    columns,
    isResizing,
    resizingColumnId,
    isDragging,
    dragColumnId,
    dragOverColumnId,
    totalWidth,
    columnWidths,
    pinnedLeftColumns,
    pinnedRightColumns,
    getColumn,
    getColumnIndex,
    updateColumnWidth,
    startResize,
    stopResize,
    toggleColumnPin,
    startDrag,
    onDragOver,
    dropColumn,
    cancelDrag,
    moveColumn,
    getColumnStyle,
    getCellStyle,
    getPinnedLeftOffset,
    getPinnedRightOffset,
  }
}
