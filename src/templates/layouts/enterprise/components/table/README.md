# Table Components

Enterprise table with advanced features: sticky header, column pinning, resizing, selection, and pagination.

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│ TableStickyContainer (visible on scroll)                        │
│ │ [Sticky Header - Fixed position when scrolling]             │ │
├─────────────────────────────────────────────────────────────────┤
│ MpTableContainer                                                │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ MpTable                                                     │ │
│ │ ┌─────┬───────┬───────┬───────┬─────────────────┬─────┐     │ │
│ │ │ □   │ COL 1 │ COL 2 │ COL 3 │ ...             │ PIN │     │ │
│ │ │     │  ↕    │  ↕    │  ↕    │                 │  ↕  │     │ │
│ │ ├─────┼───────┼───────┼───────┼─────────────────┼─────┤     │ │
│ │ │ ☑   │ data  │ data  │ data  │ ...             │ ••• │     │ │
│ │ ├─────┼───────┼───────┼───────┼─────────────────┼─────┤     │ │
│ │ │ □   │ data  │ data  │ data  │ ...             │ ••• │     │ │
│ │ └─────┴───────┴───────┴───────┴─────────────────┴─────┘     │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ TablePagination                                                 │
│ │ Rows per page: [10 ▼]  Showing 1-10 of 50     [<] 1/5 [>]   │ │
└─────────────────────────────────────────────────────────────────┘

Legend: □ Checkbox  ☑ Checked  ↕ Resize handle  ••• Actions
```

## Components

| Component | Description |
|-----------|-------------|
| `EnterpriseTable` | Main table with all features |
| `TableHeaderCell` | Header cell with pin menu and resize handle |
| `TablePagination` | Pagination controls |
| `TableStickyContainer` | Container for sticky header |

## Usage

### Basic Table

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EnterpriseTable, type EnterpriseTableColumn } from '../components/table'

interface Invoice {
  id: number
  number: string
  customer: string
  amount: string
  status: 'Paid' | 'Open' | 'Overdue'
}

const columns: EnterpriseTableColumn<Invoice>[] = [
  { id: 'number', label: 'NUMBER', width: 180, minWidth: 100 },
  { id: 'customer', label: 'CUSTOMER', width: 220, minWidth: 120 },
  { id: 'amount', label: 'AMOUNT', width: 140, minWidth: 80 },
  { id: 'status', label: 'STATUS', width: 120, minWidth: 80 },
]

const data = ref<Invoice[]>([
  { id: 1, number: 'INV-001', customer: 'Acme Corp', amount: 'Rp1.000.000', status: 'Paid' },
  { id: 2, number: 'INV-002', customer: 'Tech Inc', amount: 'Rp2.500.000', status: 'Open' },
])

const selectedKeys = ref<number[]>([])
</script>

<template>
  <EnterpriseTable
    :data="data"
    :columns="columns"
    row-key="id"
    :total-items="data.length"
    v-model:selected-keys="selectedKeys"
  />
</template>
```

### Custom Cell Rendering

```vue
<template>
  <EnterpriseTable :data="data" :columns="columns" row-key="id">
    <template #cell-status="{ row }">
      <MpBadge :type="getStatusType(row.status)">
        {{ row.status }}
      </MpBadge>
    </template>

    <template #cell-actions="{ row }">
      <MpButton variant="ghost" size="sm" @click="handleEdit(row)">
        Edit
      </MpButton>
    </template>
  </EnterpriseTable>
</template>
```

### Features Configuration

```vue
<template>
  <EnterpriseTable
    :data="data"
    :columns="columns"
    row-key="id"
    :total-items="100"
    :features="{
      stickyHeader: true,
      columnPin: true,
      columnResize: true,
      selectable: true,
      pagination: true,
    }"
    @row-click="handleRowClick"
    @selection-change="handleSelectionChange"
  />
</template>
```

## Props

### EnterpriseTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | required | Array of data items |
| `columns` | `EnterpriseTableColumn<T>[]` | required | Column configuration |
| `rowKey` | `keyof T \| (row: T) => RowKey` | required | Unique row identifier |
| `features` | `EnterpriseTableFeatures` | see below | Feature toggles |
| `density` | `'default' \| 'compact'` | `'compact'` | Row density |
| `totalItems` | `number` | - | Total items for pagination |
| `rowsPerPageOptions` | `number[]` | `[10, 25, 50, 100]` | Pagination options |
| `disabledKeys` | `RowKey[]` | `[]` | Disabled row keys |

### EnterpriseTableFeatures

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `stickyHeader` | `boolean` | `true` | Enable sticky header |
| `columnPin` | `boolean` | `true` | Enable column pinning |
| `columnResize` | `boolean` | `true` | Enable column resizing |
| `selectable` | `boolean` | `true` | Enable row selection |
| `pagination` | `boolean` | `true` | Enable pagination |

### EnterpriseTableColumn

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | required | Unique column ID |
| `label` | `string` | required | Header text |
| `width` | `number` | required | Column width (px) |
| `minWidth` | `number` | - | Minimum width |
| `pinned` | `'left' \| 'right'` | - | Pin position |
| `accessor` | `(row: T) => any` | - | Value accessor |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:selectedKeys` | `RowKey[]` | Selection changed |
| `selection-change` | `{ rows, keys }` | Selection changed with rows |
| `row-click` | `{ row, index }` | Row clicked |
| `page-change` | `number` | Page changed |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `empty` | - | Custom empty state |
| `header-{columnId}` | `{ column }` | Custom header |
| `cell-{columnId}` | `{ row, value, index, column }` | Custom cell |

## Column Pinning

Pin columns to left or right. Checkbox column is auto-pinned to left.

```typescript
const columns = [
  { id: 'name', label: 'NAME', width: 200, pinned: 'left' },
  { id: 'email', label: 'EMAIL', width: 250 },
  { id: 'actions', label: '', width: 48, pinned: 'right' },
]
```

## Row Selection

```vue
<script setup>
const selectedKeys = ref<number[]>([])
</script>

<template>
  <EnterpriseTable
    v-model:selected-keys="selectedKeys"
    :disabled-keys="[3, 5]"
    @selection-change="handleSelection"
  />
</template>
```
