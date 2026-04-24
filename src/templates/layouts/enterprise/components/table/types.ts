import type { Ref, ComputedRef } from 'vue'

export interface ColumnConfig {
  id: string
  label: string
  width: number
  minWidth?: number
  pinned?: 'left' | 'right' | null
}

/**
 * Extended column configuration for EnterpriseTable
 */
export interface EnterpriseTableColumn<TData = any> extends Omit<ColumnConfig, 'pinned'> {
  /** Initial pin position */
  pinned?: 'left' | 'right' | null
  /** Custom cell render slot name (defaults to cell-{id}) */
  slotName?: string
  /** Accessor function to get cell value from row */
  accessor?: (row: TData) => any
  /** Whether this column is sortable */
  sortable?: boolean
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
}

export interface EnterpriseTableFeatures {
  /** Enable sticky header on scroll (default: true) */
  stickyHeader?: boolean
  /** Enable column pinning to left/right (default: true) */
  columnPin?: boolean
  /** Enable column resize by dragging (default: true) */
  columnResize?: boolean
  /** Enable row selection with checkboxes (default: true) */
  selectable?: boolean
  /** Enable pagination controls (default: true) */
  pagination?: boolean
  /** Top offset for sticky header positioning (default: '0px') */
  stickyTopOffset?: string
}

export type RowKey = string | number

export interface EnterpriseTableEmits<T> {
  'update:selectedKeys': [keys: RowKey[]]
  'update:columns': [columns: EnterpriseTableColumn<T>[]]
  /** Emitted when selection changes - provides both selected rows and their keys */
  'selection-change': [selectedRows: T[], selectedKeys: RowKey[]]
  'row-click': [row: T, index: number]
  'page-change': [page: number]
  'rows-per-page-change': [rowsPerPage: number]
  'column-resize': [columnId: string, width: number]
  'column-pin': [columnId: string, position: 'left' | 'right' | null]
}

export interface EnterpriseTableContext {
  features: ComputedRef<Required<EnterpriseTableFeatures>>
  columns: Ref<ColumnConfig[]>
  getColumnStyle: (columnId: string) => Record<string, string>
  getCellStyle: (columnId: string) => Record<string, string>
  resizingColumnId: Ref<string | null>
}

export interface UseTableColumnsReturn {
  columns: Ref<ColumnConfig[]>
  isResizing: Ref<boolean>
  resizingColumnId: Ref<string | null>
  isDragging: Ref<boolean>
  dragColumnId: Ref<string | null>
  dragOverColumnId: Ref<string | null>
  totalWidth: ComputedRef<number>
  columnWidths: ComputedRef<number[]>
  pinnedLeftColumns: ComputedRef<ColumnConfig[]>
  pinnedRightColumns: ComputedRef<ColumnConfig[]>
  getColumn: (id: string) => ColumnConfig | undefined
  getColumnIndex: (id: string) => number
  updateColumnWidth: (id: string, width: number) => void
  startResize: (columnId: string, event: MouseEvent) => void
  stopResize: () => void
  toggleColumnPin: (id: string, position: 'left' | 'right' | null) => void
  startDrag: (columnId: string) => void
  onDragOver: (columnId: string) => void
  dropColumn: (targetColumnId: string) => void
  cancelDrag: () => void
  moveColumn: (columnId: string, toIndex: number) => void
  getColumnStyle: (columnId: string) => Record<string, string>
  getCellStyle: (columnId: string) => Record<string, string>
  getPinnedLeftOffset: (columnId: string) => number
  getPinnedRightOffset: (columnId: string) => number
}

export interface UseStickyTableHeaderReturn {
  isStickyVisible: ComputedRef<boolean>
  containerWidth: Ref<number>
  topOffset: string
  recalculateWidth: () => void
  cleanup: () => void
}
