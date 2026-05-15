# Universal Search Components

Search modal with AI integration, scope filtering, and keyboard navigation.

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│ Modal Overlay                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ SearchInput                                                 │ │
│ │ ┌─────┬────────────────────────────────────────┬──────┐     │ │
│ │ │ 🔍  │ Search transactions, contacts, help... │  ✕   │     │ │
│ │ └─────┴────────────────────────────────────────┴──────┘     │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ SearchScopeTabs                                             │ │
│ │ Search in: [Sales] [Purchases] [Expenses] [Products] ...   │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ AISuggestion                                                │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ ✨ AI can help: "Show me overdue invoices"              │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ Search Results                                              │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ CONTACTS                                                │ │ │
│ │ │ ┌───┬─────────────────────────────────────────────┐     │ │ │
│ │ │ │ 👤│ John Doe · Customer                         │     │ │ │
│ │ │ └───┴─────────────────────────────────────────────┘     │ │ │
│ │ │ [Show more]                                             │ │ │
│ │ ├─────────────────────────────────────────────────────────┤ │ │
│ │ │ QUICK ACTIONS                                           │ │ │
│ │ │ ┌───┬─────────────────────────────────────────────┐     │ │ │
│ │ │ │ ➕│ Create sales invoice                        │     │ │ │
│ │ │ └───┴─────────────────────────────────────────────┘     │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────┤ │
│ │ Footer: [↑↓ Navigate]  [↵ Select]  [Esc Close]              │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Components

| Component | Description |
|-----------|-------------|
| `UniversalSearch` | Main search modal |
| `SearchInput` | Input field with clear button |
| `SearchScopeTabs` | Scope filter tabs |
| `SearchResultCategory` | Grouped results with expand/collapse |
| `SearchResultItem` | Individual result item |
| `AISuggestion` | AI suggestion panel |
| `RecentSearches` | Recent search history |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { UniversalSearch, useUniversalSearch } from '../components/universal-search'

const { open } = useUniversalSearch()
</script>

<template>
  <MpButton @click="open">Search (⌘K)</MpButton>
  <UniversalSearch />
</template>
```

### With QuickSearch Trigger

```vue
<script setup lang="ts">
import { QuickSearch } from '../components/layout'
import { UniversalSearch } from '../components/universal-search'
</script>

<template>
  <QuickSearch />
  <UniversalSearch />
</template>
```

## Composable: useUniversalSearch

```typescript
import { useUniversalSearch } from '../components/universal-search'

const {
  // State
  isOpen,           // Modal visibility
  query,            // Search query
  isLoading,        // Loading state
  activeScope,      // Current scope filter
  displayResults,   // Filtered results
  hasResults,       // Has any results
  activeItem,       // Keyboard selected item

  // Actions
  open,
  close,
  setScope,
  setQuery,
  clearQuery,

  // Category
  toggleCategory,
  isCategoryExpanded,

  // History
  addToRecentSearches,

  // Keyboard
  navigateDown,
  navigateUp,
} = useUniversalSearch()
```

## Types

```typescript
type SearchScope = 'sales' | 'purchases' | 'expenses' | 'products' | 'contacts' | 'files'

type SearchCategory = 'contacts' | 'quick-actions' | 'files' | 'help-center'

interface SearchResultItem {
  id: string
  name: string
  caption?: string
  avatarSrc?: string
  icon?: IconName
  category: SearchCategory
  action?: string
}

interface SearchResults {
  contacts: SearchResultItem[]
  'quick-actions': SearchResultItem[]
  files: SearchResultItem[]
  'help-center': SearchResultItem[]
}
```

## Props

### SearchInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | required | v-model value |
| `placeholder` | `string` | `'Search...'` | Placeholder text |

### SearchScopeTabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeScope` | `SearchScope` | required | Active scope |

### SearchResultCategory

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | `SearchCategoryConfig` | required | Category config |
| `items` | `SearchResultItem[]` | required | Items in category |
| `isExpanded` | `boolean` | `false` | Expansion state |
| `highlightQuery` | `string` | `''` | Query to highlight |
| `activeItemId` | `string` | - | Active item ID |

### SearchResultItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `SearchResultItem` | required | Item data |
| `highlightQuery` | `string` | `''` | Query to highlight |
| `isActive` | `boolean` | `false` | Keyboard active state |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `⌘K` / `Ctrl+K` | Open search |
| `↓` Arrow Down | Navigate down |
| `↑` Arrow Up | Navigate up |
| `↵` Enter | Select item |
| `Esc` | Close modal |

## Features

### Query Highlighting

Search query is automatically highlighted in results using bold text.

### Category Expansion

Categories show `defaultVisibleCount` items by default. Click "Show more" to expand.

### Recent Searches

Recent searches are stored and shown when input is empty.

### AI Suggestions

AI suggestion panel shows contextual suggestions based on query and scope.
