import type { IconName } from '@mekari/pixel3'

/**
 * Search scope/filter types
 */
export type SearchScope = 'sales' | 'purchases' | 'expenses' | 'products' | 'contacts' | 'files'

/**
 * Search scope configuration
 */
export interface SearchScopeConfig {
  id: SearchScope
  label: string
}

/**
 * Search scope configuration constants
 */
export const SCOPE_CONFIGS: SearchScopeConfig[] = [
  { id: 'sales', label: 'Sales' },
  { id: 'purchases', label: 'Purchases' },
  { id: 'expenses', label: 'Expenses' },
  { id: 'products', label: 'Products' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'files', label: 'Files' },
]

/**
 * Search result category types
 */
export type SearchCategory = 'contacts' | 'quick-actions' | 'files' | 'help-center'

/**
 * Individual search result item
 */
export interface SearchResultItem {
  id: string
  name: string
  caption?: string
  /** Avatar image URL - for contacts/employee */
  avatarSrc?: string
  /** Icon name - for non-avatar categories */
  icon?: IconName
  /** The category this item belongs to */
  category: SearchCategory
  /** Optional link/action */
  action?: string
}

/**
 * Category configuration for display
 */
export interface SearchCategoryConfig {
  id: SearchCategory
  label: string
  /** Default number of items to show before "Show more" */
  defaultVisibleCount: number
}

/**
 * Grouped search results by category
 */
export interface SearchResults {
  contacts: SearchResultItem[]
  'quick-actions': SearchResultItem[]
  files: SearchResultItem[]
  'help-center': SearchResultItem[]
}

/**
 * Recent search entry
 */
export interface RecentSearch {
  id: string
  query: string
  timestamp: number
}

/**
 * Category configuration constants
 */
export const CATEGORY_CONFIGS: SearchCategoryConfig[] = [
  { id: 'contacts', label: 'Contacts', defaultVisibleCount: 5 },
  { id: 'quick-actions', label: 'Quick actions', defaultVisibleCount: 5 },
  { id: 'files', label: 'Files', defaultVisibleCount: 5 },
  { id: 'help-center', label: 'Help center', defaultVisibleCount: 5 },
]
