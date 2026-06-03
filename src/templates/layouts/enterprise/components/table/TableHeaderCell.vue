<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  css,
  MpFlex,
  MpButton,
  MpIcon,
  MpTableCell,
  MpPopover,
  MpPopoverTrigger,
  MpPopoverContent,
  MpPopoverList,
  MpPopoverListItem,
} from '@mekari/pixel3'
import type { ColumnConfig } from './types'

interface Props {
  /** Column configuration */
  column: ColumnConfig
  /** Column index in the array */
  columnIndex: number
  /** Total number of columns */
  totalColumns: number
  /** Style object for the cell (from getColumnStyle) */
  cellStyle: Record<string, string>
  /** Enable column pinning feature */
  enablePin?: boolean
  /** Enable column resize feature */
  enableResize?: boolean
  /** Whether this column is currently being resized */
  isResizing?: boolean
  /** Use portal for popover (needed in sticky header) */
  usePortal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enablePin: true,
  enableResize: true,
  isResizing: false,
  usePortal: false
})

const emit = defineEmits<{
  /** Emitted when resize starts on this column */
  resizeStart: [columnId: string, event: MouseEvent]
  /** Emitted when pin position changes */
  pin: [columnId: string, position: 'left' | 'right']
}>()

// Local state for resize handle hover
const isResizeHovered = ref(false)

// Computed styles for resize handle
const resizeHandleStyle = computed(() => ({
  backgroundColor: props.isResizing
    ? 'var(--mp-colors-background-brand-bold-pressed)'
    : isResizeHovered.value
      ? 'var(--mp-colors-background-brand-bold-hovered)'
      : undefined
}))

// Whether to show resize handle (not on last column)
const showResizeHandle = computed(() => {
  return props.enableResize && props.columnIndex < props.totalColumns - 1
})

// Handle resize mousedown
function onResizeMouseDown(event: MouseEvent) {
  emit('resizeStart', props.column.id, event)
}

// Handle pin actions
function handlePinLeft() {
  emit('pin', props.column.id, 'left')
}

function handlePinRight() {
  emit('pin', props.column.id, 'right')
}
</script>

<template>
  <MpTableCell
    scope="col"
    data-group
    :class="css({ position: 'relative' })"
    :style="cellStyle"
  >
    <!-- Custom content slot -->
    <slot>
      <!-- Default: label with pin menu -->
      <MpFlex alignItems="center" justifyContent="space-between" gap="1">
        <span :class="css({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })">
          {{ column.label }}
        </span>

        <!-- Pin Popover -->
        <MpPopover
          v-if="enablePin && column.label"
          v-slot="{ onClosePopover }"
          :use-portal="usePortal"
          placement="bottom-end"
        >
          <MpPopoverTrigger>
            <MpButton
              variant="ghost"
              size="sm"
              :class="css({
                opacity: '0',
                transition: 'opacity 150ms',
                minWidth: '20px',
                height: '20px',
                p: '0',
                flexShrink: '0',
                '[data-group]:hover &': { opacity: '1' },
              })"
            >
              <MpIcon name="chevrons-down" size="sm" />
            </MpButton>
          </MpPopoverTrigger>
          <MpPopoverContent :class="css({ minWidth: '140px' })">
            <MpPopoverList>
              <MpPopoverListItem
                :is-active="column.pinned === 'left'"
                @click="() => { handlePinLeft(); onClosePopover() }"
              >
                <MpFlex alignItems="center" gap="2">
                  <MpIcon name="pin" size="sm" />
                  Pin to left
                </MpFlex>
              </MpPopoverListItem>
              <MpPopoverListItem
                :is-active="column.pinned === 'right'"
                @click="() => { handlePinRight(); onClosePopover() }"
              >
                <MpFlex alignItems="center" gap="2">
                  <MpIcon name="pin" size="sm" />
                  Pin to right
                </MpFlex>
              </MpPopoverListItem>
            </MpPopoverList>
          </MpPopoverContent>
        </MpPopover>
      </MpFlex>
    </slot>

    <!-- Resize Handle -->
    <div
      v-if="showResizeHandle"
      draggable="false"
      :class="css({
        position: 'absolute',
        right: '-2px',
        top: '0',
        bottom: '0',
        width: '4px',
        cursor: 'col-resize',
        bg: 'transparent',
        zIndex: '10',
      })"
      :style="resizeHandleStyle"
      @mouseenter="isResizeHovered = true"
      @mouseleave="isResizeHovered = false"
      @mousedown.stop.prevent="onResizeMouseDown"
    />
  </MpTableCell>
</template>
