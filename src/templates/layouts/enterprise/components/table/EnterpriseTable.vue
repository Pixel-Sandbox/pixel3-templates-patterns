<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, watch, useSlots } from 'vue'
import {
  css,
  MpTable,
  MpTableHead,
  MpTableBody,
  MpTableRow,
  MpTableCell,
  MpTableContainer,
  MpCheckbox,
  MpFlex,
  MpText,
} from '@mekari/pixel3'
import { useStickyTableHeader } from '../../composables/useStickyTableHeader'
import { useTableColumns, type ColumnConfig } from '../../composables/useTableColumns'
import TableStickyContainer from './TableStickyContainer.vue'
import TableHeaderCell from './TableHeaderCell.vue'
import TablePagination from './TablePagination.vue'
import type { EnterpriseTableColumn, EnterpriseTableFeatures, RowKey } from './types'

interface Props {
  /** Table data array */
  data: T[]
  /** Column configurations */
  columns: EnterpriseTableColumn<T>[]
  /** Unique key accessor for each row */
  rowKey: keyof T | ((row: T) => RowKey)
  /** Feature toggles */
  features?: EnterpriseTableFeatures
  /** Pagination: total items (required if pagination enabled) */
  totalItems?: number
  /** Pagination: rows per page options */
  rowsPerPageOptions?: number[]
  /** Keys of rows that should have disabled checkbox */
  disabledKeys?: RowKey[]
  /** Function to determine if row checkbox is disabled */
  isRowDisabled?: (row: T) => boolean
}

const props = withDefaults(defineProps<Props>(), {
  features: () => ({}),
  rowsPerPageOptions: () => [10, 25, 50, 100]
})

const emit = defineEmits<{
  /** Selection changed */
  'update:selectedKeys': [keys: RowKey[]]
  /** Columns configuration changed (resize, pin, reorder) */
  'update:columns': [columns: EnterpriseTableColumn<T>[]]
  /** Selection changed with full row data */
  'selection-change': [selectedRows: T[], selectedKeys: RowKey[]]
  /** Row clicked */
  'row-click': [row: T, index: number]
  /** Page changed */
  'page-change': [page: number]
  /** Rows per page changed */
  'rows-per-page-change': [rowsPerPage: number]
}>()

// v-model for selection
const selectedKeys = defineModel<RowKey[]>('selectedKeys', { default: () => [] })

const slots = useSlots()

const mergedFeatures = computed(() => ({
  stickyHeader: true,
  columnPin: true,
  columnResize: true,
  selectable: true,
  pagination: true,
  stickyTopOffset: '0px',
  ...props.features
}))

// Compact table styles (consumer-level override)
const compactTableClass = css({
  '& th, & td': {
    minHeight: '7!',
    paddingX: '2!',
  },
  '& th': {
    paddingY: '1.5!',
  },
  '& td': {
    paddingY: '2.5!',
  }
})

// Check if any user column is pinned to left - checkbox will follow
const shouldCheckboxBePinned = computed(() => {
  return props.columns.some(col => col.pinned === 'left')
})

// Build internal column config (add checkbox column if selectable)
const internalColumnConfig = computed<ColumnConfig[]>(() => {
  const cols: ColumnConfig[] = []

  // Add checkbox column if selectable
  // Checkbox auto-pins to left if any other column is pinned left
  if (mergedFeatures.value.selectable) {
    cols.push({
      id: '__checkbox',
      label: '',
      width: 32,
      minWidth: 32,
      pinned: shouldCheckboxBePinned.value ? 'left' : null
    })
  }

  // Add user columns
  cols.push(...props.columns.map(col => ({
    id: col.id,
    label: col.label,
    width: col.width,
    minWidth: col.minWidth,
    pinned: col.pinned ?? null
  })))

  return cols
})

const {
  columns: internalColumns,
  resizingColumnId,
  startResize,
  getColumnStyle,
  getCellStyle,
  toggleColumnPin,
  getColumn,
  totalWidth
} = useTableColumns({
  columns: internalColumnConfig.value,
  onColumnsChange: (cols) => {
    // Map back to user column format (excluding internal columns)
    const userCols = cols
      .filter(c => !c.id.startsWith('__'))
      .map(c => {
        const original = props.columns.find(oc => oc.id === c.id)
        return {
          ...original!,
          width: c.width,
          pinned: c.pinned
        }
      })
    emit('update:columns', userCols)
  }
})

// Sync internal columns when props.columns change
watch(() => props.columns, (newCols) => {
  const hasLeftPinned = newCols.some(col => col.pinned === 'left')
  const cols: ColumnConfig[] = []
  if (mergedFeatures.value.selectable) {
    cols.push({
      id: '__checkbox',
      label: '',
      width: 32,
      minWidth: 32,
      pinned: hasLeftPinned ? 'left' : null
    })
  }
  cols.push(...newCols.map(col => ({
    id: col.id,
    label: col.label,
    width: col.width,
    minWidth: col.minWidth,
    pinned: col.pinned ?? null
  })))
  internalColumns.value = cols
}, { deep: true })

// Sync checkbox pinned state when any column's pinned state changes internally
watch(internalColumns, (cols) => {
  const checkboxCol = cols.find(c => c.id === '__checkbox')
  if (!checkboxCol) return

  // Check if any non-checkbox column is pinned left
  const hasLeftPinned = cols.some(c => c.id !== '__checkbox' && c.pinned === 'left')
  const shouldBePinned = hasLeftPinned ? 'left' : null

  // Update checkbox pinned state if it differs
  if (checkboxCol.pinned !== shouldBePinned) {
    checkboxCol.pinned = shouldBePinned
  }
}, { deep: true })

const tableWrapper = ref<HTMLElement | null>(null)
const mainTableContainer = ref<InstanceType<typeof MpTableContainer> | null>(null)
const stickyHeaderContainer = ref<HTMLElement | null>(null)
const mainTableElement = ref<InstanceType<typeof MpTable> | null>(null)
const tableHeaderRow = ref<InstanceType<typeof MpTableRow> | null>(null)

const tableContainerEl = computed(() => mainTableContainer.value?.$el ?? null)
const tableEl = computed(() => mainTableElement.value?.$el ?? null)
const headerRowEl = computed(() => tableHeaderRow.value?.$el ?? null)

const {
  isStickyVisible,
  containerWidth
} = useStickyTableHeader({
  tableWrapperRef: tableWrapper,
  tableContainerRef: tableContainerEl,
  stickyHeaderRef: stickyHeaderContainer,
  tableRef: tableEl,
  headerRowRef: headerRowEl,
  topOffset: mergedFeatures.value.stickyTopOffset
})

const getRowKey = (row: T, index: number): RowKey => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
  return row[props.rowKey] as RowKey
}

// Check if a row's checkbox should be disabled
function isDisabledRow(row: T, index: number): boolean {
  const key = getRowKey(row, index)
  if (props.disabledKeys?.includes(key)) return true
  if (props.isRowDisabled?.(row)) return true
  return false
}

// Get selectable rows (excluding disabled ones)
const selectableRows = computed(() => {
  return props.data.filter((row, i) => !isDisabledRow(row, i))
})

const isAllSelected = computed(() => {
  if (selectableRows.value.length === 0) return false
  return selectableRows.value.every((row, i) => {
    const key = getRowKey(row, props.data.indexOf(row))
    return selectedKeys.value.includes(key)
  })
})

const isIndeterminate = computed(() => {
  if (selectedKeys.value.length === 0) return false
  return !isAllSelected.value
})

function handleSelectAll(checked: boolean) {
  if (checked) {
    // Select all selectable (non-disabled) rows
    selectedKeys.value = selectableRows.value.map((row) => {
      const originalIndex = props.data.indexOf(row)
      return getRowKey(row, originalIndex)
    })
  } else {
    selectedKeys.value = []
  }
}

function handleSelectRow(key: RowKey) {
  const index = selectedKeys.value.indexOf(key)
  if (index === -1) {
    selectedKeys.value = [...selectedKeys.value, key]
  } else {
    selectedKeys.value = selectedKeys.value.filter(k => k !== key)
  }
}

function isRowSelected(key: RowKey): boolean {
  return selectedKeys.value.includes(key)
}

// Get selected rows data
function getSelectedRows(): T[] {
  return props.data.filter((row, i) => {
    const key = getRowKey(row, i)
    return selectedKeys.value.includes(key)
  })
}

// Emit selection-change when selectedKeys changes
watch(selectedKeys, (keys) => {
  const selectedRows = getSelectedRows()
  emit('selection-change', selectedRows, keys)
}, { deep: true })

const currentPage = ref(1)
const rowsPerPage = ref(props.rowsPerPageOptions[0] || 10)

function handleResizeStart(columnId: string, event: MouseEvent) {
  startResize(columnId, event)
}

function handlePin(columnId: string, position: 'left' | 'right') {
  toggleColumnPin(columnId, position)
}

function handleRowClick(row: T, index: number) {
  emit('row-click', row, index)
}

function getCellSlotName(column: ColumnConfig): string {
  if (column.id.startsWith('__')) return ''
  const originalCol = props.columns.find(c => c.id === column.id)
  return originalCol?.slotName || `cell-${column.id}`
}

function getHeaderSlotName(column: ColumnConfig): string {
  if (column.id.startsWith('__')) return ''
  return `header-${column.id}`
}

function hasCellSlot(column: ColumnConfig): boolean {
  const slotName = getCellSlotName(column)
  return slotName !== '' && !!slots[slotName]
}

function hasHeaderSlot(column: ColumnConfig): boolean {
  const slotName = getHeaderSlotName(column)
  return slotName !== '' && !!slots[slotName]
}

function getColumnAccessor(columnId: string) {
  return props.columns.find(c => c.id === columnId)?.accessor
}

function getCellValue(row: T, columnId: string) {
  const accessor = getColumnAccessor(columnId)
  if (accessor) return accessor(row)
  return row[columnId]
}

// Check if column is checkbox or internal
function isInternalColumn(column: ColumnConfig): boolean {
  return column.id.startsWith('__')
}
</script>

<template>
  <div
    ref="tableWrapper"
    :class="css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    })"
    :style="{ '--main-table-width': `${containerWidth}px` }"
  >
    <!-- Sticky Header -->
    <TableStickyContainer
      v-if="mergedFeatures.stickyHeader"
      :is-visible="isStickyVisible"
      :top-offset="mergedFeatures.stickyTopOffset"
    >
      <div
        ref="stickyHeaderContainer"
        :class="css({
          width: 'var(--main-table-width)',
          maxWidth: 'var(--main-table-width)',
          overflow: 'hidden',
        })"
      >
        <MpTable :class="compactTableClass" :style="{ tableLayout: 'fixed', minWidth: `${totalWidth}px` }">
          <MpTableHead>
            <MpTableRow>
              <template v-for="(col, index) in internalColumns" :key="col.id">
                <!-- Checkbox Header -->
                <MpTableCell
                  v-if="col.id === '__checkbox'"
                  scope="col"
                  :style="{ ...getColumnStyle(col.id), paddingLeft: '12px', paddingRight: '0' }"
                >
                  <MpCheckbox
                    :is-indeterminate="isIndeterminate"
                    :is-checked="isAllSelected"
                    @change="handleSelectAll"
                  />
                </MpTableCell>

                <!-- Custom Header Slot -->
                <TableHeaderCell
                  v-else-if="hasHeaderSlot(col)"
                  :column="col"
                  :column-index="index"
                  :total-columns="internalColumns.length"
                  :cell-style="getColumnStyle(col.id)"
                  :enable-pin="mergedFeatures.columnPin"
                  :enable-resize="mergedFeatures.columnResize"
                  :is-resizing="resizingColumnId === col.id"
                  :use-portal="true"
                  @resize-start="handleResizeStart"
                  @pin="handlePin"
                >
                  <slot :name="getHeaderSlotName(col)" :column="col" />
                </TableHeaderCell>

                <!-- Default Header Cell -->
                <TableHeaderCell
                  v-else
                  :column="col"
                  :column-index="index"
                  :total-columns="internalColumns.length"
                  :cell-style="getColumnStyle(col.id)"
                  :enable-pin="mergedFeatures.columnPin"
                  :enable-resize="mergedFeatures.columnResize"
                  :is-resizing="resizingColumnId === col.id"
                  :use-portal="true"
                  @resize-start="handleResizeStart"
                  @pin="handlePin"
                />
              </template>
            </MpTableRow>
          </MpTableHead>
        </MpTable>
      </div>
    </TableStickyContainer>

    <!-- Main Table -->
    <MpTableContainer
      ref="mainTableContainer"
      :class="css({ width: 'full', maxWidth: 'full', overflow: 'auto' })"
    >
      <MpTable
        ref="mainTableElement"
        :class="compactTableClass"
        :style="{ tableLayout: 'fixed', minWidth: `${totalWidth}px` }"
      >
        <MpTableHead>
          <MpTableRow ref="tableHeaderRow">
            <template v-for="(col, index) in internalColumns" :key="col.id">
              <!-- Checkbox Header -->
              <MpTableCell
                v-if="col.id === '__checkbox'"
                scope="col"
                :style="{ ...getColumnStyle(col.id), paddingLeft: '12px', paddingRight: '0' }"
              >
                <MpCheckbox
                  :is-indeterminate="isIndeterminate"
                  :is-checked="isAllSelected"
                  @change="handleSelectAll"
                />
              </MpTableCell>

              <!-- Custom Header Slot -->
              <TableHeaderCell
                v-else-if="hasHeaderSlot(col)"
                :column="col"
                :column-index="index"
                :total-columns="internalColumns.length"
                :cell-style="getColumnStyle(col.id)"
                :enable-pin="mergedFeatures.columnPin"
                :enable-resize="mergedFeatures.columnResize"
                :is-resizing="resizingColumnId === col.id"
                @resize-start="handleResizeStart"
                @pin="handlePin"
              >
                <slot :name="getHeaderSlotName(col)" :column="col" />
              </TableHeaderCell>

              <!-- Default Header Cell -->
              <TableHeaderCell
                v-else
                :column="col"
                :column-index="index"
                :total-columns="internalColumns.length"
                :cell-style="getColumnStyle(col.id)"
                :enable-pin="mergedFeatures.columnPin"
                :enable-resize="mergedFeatures.columnResize"
                :is-resizing="resizingColumnId === col.id"
                @resize-start="handleResizeStart"
                @pin="handlePin"
              />
            </template>
          </MpTableRow>
        </MpTableHead>

        <MpTableBody>
          <!-- Empty State -->
          <MpTableRow v-if="data.length === 0">
            <MpTableCell as="td" :colspan="internalColumns.length">
              <slot name="empty">
                <MpFlex justify="center" align="center" py="8">
                  <MpText color="gray.500">No data available</MpText>
                </MpFlex>
              </slot>
            </MpTableCell>
          </MpTableRow>

          <!-- Data Rows -->
          <MpTableRow
            v-for="(row, rowIndex) in data"
            :key="getRowKey(row, rowIndex)"
            :style="{ minHeight: '40px' }"
            @click="handleRowClick(row, rowIndex)"
          >
            <MpTableCell
              v-for="col in internalColumns"
              :key="col.id"
              as="td"
              class="group"
              :style="col.id === '__checkbox' ? { ...getCellStyle(col.id), paddingLeft: '12px', paddingRight: '0' } : getCellStyle(col.id)"
            >
              <!-- Checkbox Cell -->
              <template v-if="col.id === '__checkbox'">
                <MpCheckbox
                  :value="String(getRowKey(row, rowIndex))"
                  :is-checked="isRowSelected(getRowKey(row, rowIndex))"
                  :is-disabled="isDisabledRow(row, rowIndex)"
                  @change="() => handleSelectRow(getRowKey(row, rowIndex))"
                  @click.stop
                />
              </template>

              <!-- Custom Cell Slot -->
              <template v-else-if="hasCellSlot(col)">
                <slot
                  :name="getCellSlotName(col)"
                  :row="row"
                  :value="getCellValue(row, col.id)"
                  :index="rowIndex"
                  :column="col"
                />
              </template>

              <!-- Default: use accessor or row[columnId] -->
              <template v-else>
                {{ getCellValue(row, col.id) }}
              </template>
            </MpTableCell>
          </MpTableRow>
        </MpTableBody>
      </MpTable>
    </MpTableContainer>

    <!-- Pagination -->
    <TablePagination
      v-if="mergedFeatures.pagination && totalItems"
      v-model:rows-per-page="rowsPerPage"
      v-model:current-page="currentPage"
      :total-items="totalItems"
      :rows-per-page-options="rowsPerPageOptions"
      @update:rows-per-page="(val) => emit('rows-per-page-change', val)"
      @update:current-page="(val) => emit('page-change', val)"
    />
  </div>
</template>
