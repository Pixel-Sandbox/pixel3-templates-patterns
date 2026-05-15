# Layout Components

Enterprise layout system with collapsible sidebars for Mekari applications.

## Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│ HeaderBar                                                       │
│ ┌─────────────┬─────────────────────────┬─────────────────────┐ │
│ │ Logo        │ QuickSearch             │ Actions UserProfile │ │
│ └─────────────┴─────────────────────────┴─────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ MainNav                                                         │
│ │ Home │ Sales │ Purchases │ Accounting │ ... │ Reports │ More │ │
├─────────────────────────────────────────────────────────────────┤
│ PageShell                                                       │
│ ┌───────────┬─────────────────────────────────────┬───────────┐ │
│ │           │ PageMain                            │           │ │
│ │ PageLeft  │ ┌─────────────────────────────────┐ │ PageRight │ │
│ │ Sidebar   │ │ PageHeader                      │ │ Sidebar   │ │
│ │           │ │ [Title]           [Actions]     │ │           │ │
│ │           │ ├─────────────────────────────────┤ │           │ │
│ │ ┌───────┐ │ │ PageContent                     │ │ ┌───────┐ │ │
│ │ │Side   │ │ │                                 │ │ │Side   │ │ │
│ │ │Menu   │ │ │   [Main Content Area]           │ │ │MenuAI │ │ │
│ │ │       │ │ │                                 │ │ │       │ │ │
│ │ └───────┘ │ │                                 │ │ └───────┘ │ │
│ │           │ └─────────────────────────────────┘ │           │ │
│ └───────────┴─────────────────────────────────────┴───────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
layout/
├── header/
│   ├── HeaderBar.vue      # Top header with logo, search, actions
│   ├── QuickSearch.vue    # Search trigger in header
│   ├── QuickActions.vue   # Quick action buttons
│   ├── UserProfile.vue    # User profile dropdown
│   └── index.ts
├── main-nav/
│   ├── MainNav.vue        # Horizontal navigation bar
│   ├── MenuItem.vue       # Navigation menu item
│   ├── menus.ts           # Menu configuration data
│   └── index.ts
├── page/
│   ├── PageShell.vue      # Root flex container
│   ├── PageLeftSidebar.vue
│   ├── PageMain.vue       # Main content stage
│   ├── PageRightSidebar.vue
│   ├── PageHeader.vue     # Page title and actions
│   ├── PageContent.vue    # Content area
│   ├── PageToggleButton.vue
│   ├── SideMenu.vue       # Left sidebar menu
│   ├── SideMenuAI.vue     # Right sidebar AI panel
│   ├── SideMenuItem.vue   # Menu item
│   └── index.ts
├── BaseLayout.vue         # Root layout with header and nav
├── index.ts               # Re-exports all components
└── README.md
```

## Components

### Header Components

| Component | Description |
|-----------|-------------|
| `HeaderBar` | Top header bar with logo, search, and user actions |
| `QuickSearch` | Search trigger button that opens universal search |
| `QuickActions` | Quick action buttons (create new, notifications) |
| `UserProfile` | User profile dropdown menu |

### Navigation Components

| Component | Description |
|-----------|-------------|
| `MainNav` | Horizontal navigation bar below header |
| `MenuItem` | Individual navigation menu item |

### Page Components

| Component | Description |
|-----------|-------------|
| `PageShell` | Root flex container for the page layout |
| `PageLeftSidebar` | Collapsible left sidebar (212px) |
| `PageRightSidebar` | Collapsible right sidebar for AI panel (280px) |
| `PageMain` | Main content stage (flex: 1) |
| `PageHeader` | Header section with title and actions |
| `PageContent` | Content area with padding and background |
| `PageToggleButton` | Button to toggle sidebar visibility |
| `SideMenu` | Navigation menu inside left sidebar |
| `SideMenuAI` | AI assistant panel inside right sidebar |
| `SideMenuItem` | Individual menu item |

## Usage

### Basic Page Layout

```vue
<script setup lang="ts">
import {
  PageShell,
  PageLeftSidebar,
  PageMain,
  PageRightSidebar,
  PageHeader,
  PageToggleButton,
  PageContent,
  SideMenu,
  SideMenuAI
} from '../components/layout'
import { useAppSidebar } from '../composables/useAppSidebar'

const { isLeftOpen, isRightOpen, left, right } = useAppSidebar()
</script>

<template>
  <BaseLayout>
    <PageShell>
      <PageLeftSidebar :open="isLeftOpen">
        <SideMenu @toggle="left.toggle" />
      </PageLeftSidebar>

      <PageMain>
        <PageHeader>
          <MpFlex align="center" gap="6">
            <PageToggleButton v-if="!isLeftOpen" @click="left.toggle" />
            <MpText size="h1">Page Title</MpText>
          </MpFlex>

          <MpFlex align="center" gap="2">
            <MpButton>Action</MpButton>
          </MpFlex>
        </PageHeader>

        <PageContent :left-sidebar-open="isLeftOpen" :right-sidebar-open="isRightOpen">
          <!-- Your content here -->
        </PageContent>
      </PageMain>

      <PageRightSidebar :open="isRightOpen">
        <SideMenuAI @toggle="right.toggle" />
      </PageRightSidebar>
    </PageShell>
  </BaseLayout>
</template>
```

### Without Sidebars

```vue
<template>
  <BaseLayout>
    <PageShell>
      <PageMain>
        <PageContent>
          <div>Content without sidebars</div>
        </PageContent>
      </PageMain>
    </PageShell>
  </BaseLayout>
</template>
```

## Props

### PageLeftSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls sidebar visibility |

### PageRightSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls sidebar visibility |

### PageContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftSidebarOpen` | `boolean` | `true` | Adjusts left border radius |
| `rightSidebarOpen` | `boolean` | `false` | Adjusts right border radius |

### SideMenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Menu item text |
| `link` | `string` | required | Navigation link |
| `icon` | `IconName` | - | Optional right icon |

## Sidebar State

Use `useAppSidebar()` composable to manage sidebar state:

```typescript
import { useAppSidebar } from '../composables/useAppSidebar'

const { isLeftOpen, isRightOpen, left, right } = useAppSidebar()

// Control left sidebar (navigation panel)
left.toggle()
left.open()
left.close()

// Control right sidebar (AI assistant panel)
right.toggle()
right.open()
right.close()
```
