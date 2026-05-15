import { ref, computed } from 'vue'
import type {
  SearchResults,
  SearchResultItem,
  RecentSearch,
  SearchCategory,
  SearchScope,
} from '../components/universal-search/types'

// Module-level state (singleton pattern)
const isOpen = ref(false)
const query = ref('')
const isLoading = ref(false)
const activeScope = ref<SearchScope>('sales')
const results = ref<SearchResults>({
  contacts: [],
  'quick-actions': [],
  files: [],
  'help-center': [],
})
const recentSearches = ref<RecentSearch[]>([])
const error = ref<string | null>(null)
const activeIndex = ref(-1)
const expandedCategories = ref<Set<SearchCategory>>(new Set())

// Configuration
const RECENT_SEARCHES_KEY = 'universal-search-recent'
const MAX_RECENT_SEARCHES = 5
const DEBOUNCE_MS = 300

// Debounce timer
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// Mock data for search results (matching the new design)
const mockData: SearchResults = {
  contacts: [
    { id: 'c1', name: 'Procreate Indonesia', icon: 'company', category: 'contacts' },
    { id: 'c2', name: 'PT Mekari Sejahtera', icon: 'company', category: 'contacts' },
    { id: 'c3', name: 'John Smith', icon: 'folder-open', category: 'contacts' },
  ],
  'quick-actions': [
    { id: 'qa1', name: 'Create sales invoice', icon: 'add', category: 'quick-actions' },
    { id: 'qa2', name: 'Create sales order', icon: 'add', category: 'quick-actions' },
    { id: 'qa3', name: 'Create sales quote', icon: 'add', category: 'quick-actions' },
    { id: 'qa4', name: 'Create purchase invoice', icon: 'add', category: 'quick-actions' },
    { id: 'qa5', name: 'Create expense', icon: 'add', category: 'quick-actions' },
  ],
  files: [
    { id: 'f1', name: 'procreate-invoice-10090.pdf', icon: 'pdf-document', category: 'files' },
    { id: 'f2', name: 'sales-report-q4.pdf', icon: 'pdf-document', category: 'files' },
    { id: 'f3', name: 'contract-2024.docx', icon: 'word-document', category: 'files' },
  ],
  'help-center': [
    { id: 'hc1', name: 'How to create sales invoice?', icon: 'help', category: 'help-center' },
    { id: 'hc2', name: 'How to manage contacts?', icon: 'help', category: 'help-center' },
    { id: 'hc3', name: 'How to export reports?', icon: 'help', category: 'help-center' },
  ],
}

export function useUniversalSearch() {
  /**
   * Open the search modal
   */
  function open() {
    isOpen.value = true
    activeIndex.value = -1
  }

  /**
   * Close the search modal
   */
  function close() {
    isOpen.value = false
    query.value = ''
    error.value = null
    activeIndex.value = -1
    expandedCategories.value.clear()
  }

  /**
   * Toggle the search modal
   */
  function toggle() {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  /**
   * Set active search scope
   */
  function setScope(scope: SearchScope) {
    activeScope.value = scope
    // Re-trigger search if there's a query
    if (query.value.trim()) {
      performSearch(query.value)
    }
  }

  /**
   * Set search query with debouncing
   */
  function setQuery(value: string) {
    query.value = value
    activeIndex.value = -1

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    if (!value.trim()) {
      results.value = {
        contacts: [],
        'quick-actions': [],
        files: [],
        'help-center': [],
      }
      isLoading.value = false
      return
    }

    isLoading.value = true
    debounceTimer = setTimeout(() => {
      performSearch(value)
    }, DEBOUNCE_MS)
  }

  /**
   * Perform search with mock data
   */
  async function performSearch(searchQuery: string) {
    try {
      error.value = null

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const lowerQuery = searchQuery.toLowerCase()

      // Filter mock data based on query
      results.value = {
        contacts: mockData.contacts.filter((item) =>
          item.name.toLowerCase().includes(lowerQuery)
        ),
        'quick-actions': mockData['quick-actions'].filter((item) =>
          item.name.toLowerCase().includes(lowerQuery)
        ),
        files: mockData.files.filter((item) =>
          item.name.toLowerCase().includes(lowerQuery)
        ),
        'help-center': mockData['help-center'].filter((item) =>
          item.name.toLowerCase().includes(lowerQuery)
        ),
      }
    } catch (err) {
      error.value = 'Failed to fetch search results'
      console.error('Search error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear search query
   */
  function clearQuery() {
    query.value = ''
    results.value = {
      contacts: [],
      'quick-actions': [],
      files: [],
      'help-center': [],
    }
    error.value = null
    activeIndex.value = -1
  }

  /**
   * Toggle category expansion
   */
  function toggleCategory(category: SearchCategory) {
    if (expandedCategories.value.has(category)) {
      expandedCategories.value.delete(category)
    } else {
      expandedCategories.value.add(category)
    }
    // Trigger reactivity
    expandedCategories.value = new Set(expandedCategories.value)
  }

  /**
   * Check if category is expanded
   */
  function isCategoryExpanded(category: SearchCategory): boolean {
    return expandedCategories.value.has(category)
  }

  /**
   * Add to recent searches
   */
  function addToRecentSearches(searchQuery: string) {
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    // Remove duplicate if exists
    const filtered = recentSearches.value.filter((r) => r.query !== trimmed)

    // Add new search at beginning
    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      query: trimmed,
      timestamp: Date.now(),
    }

    recentSearches.value = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    saveRecentSearches()
  }

  /**
   * Remove from recent searches
   */
  function removeRecentSearch(id: string) {
    recentSearches.value = recentSearches.value.filter((r) => r.id !== id)
    saveRecentSearches()
  }

  /**
   * Clear all recent searches
   */
  function clearRecentSearches() {
    recentSearches.value = []
    saveRecentSearches()
  }

  /**
   * Load recent searches from localStorage
   */
  function loadRecentSearches() {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        recentSearches.value = JSON.parse(stored)
      }
    } catch (err) {
      console.error('Failed to load recent searches:', err)
    }
  }

  /**
   * Save recent searches to localStorage
   */
  function saveRecentSearches() {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.value))
    } catch (err) {
      console.error('Failed to save recent searches:', err)
    }
  }

  /**
   * Get flattened list of all visible results for keyboard navigation
   */
  const flattenedResults = computed(() => {
    const items: SearchResultItem[] = []
    const categories: SearchCategory[] = ['contacts', 'quick-actions', 'files', 'help-center']

    for (const category of categories) {
      const categoryItems = displayResults.value[category]
      if (categoryItems.length > 0) {
        const isExpanded = expandedCategories.value.has(category)
        const visibleItems = isExpanded ? categoryItems : categoryItems.slice(0, 5)
        items.push(...visibleItems)
      }
    }

    return items
  })

  /**
   * Navigate to next result
   */
  function navigateDown() {
    const maxIndex = flattenedResults.value.length - 1
    if (maxIndex < 0) return

    // Start from first item if no selection, otherwise move down (stop at end)
    if (activeIndex.value < 0) {
      activeIndex.value = 0
    } else if (activeIndex.value < maxIndex) {
      activeIndex.value++
    }
    // Stop at the end, don't wrap
  }

  /**
   * Navigate to previous result
   */
  function navigateUp() {
    const maxIndex = flattenedResults.value.length - 1
    if (maxIndex < 0) return

    // Only move up if there's a selection and not at the start
    if (activeIndex.value > 0) {
      activeIndex.value--
    }
    // Stop at the start, don't wrap
  }

  /**
   * Get active item
   */
  const activeItem = computed(() => {
    if (activeIndex.value >= 0 && activeIndex.value < flattenedResults.value.length) {
      return flattenedResults.value[activeIndex.value]
    }
    return null
  })

  /**
   * Handle keyboard shortcut (Cmd+K / Ctrl+K)
   */
  function handleKeyboardShortcut(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      toggle()
    }
  }

  /**
   * Computed: Display results (show default suggestions when no query)
   */
  const displayResults = computed(() => {
    if (!query.value.trim()) {
      return mockData
    }
    return results.value
  })

  /**
   * Computed: Check if there are any results
   */
  const hasResults = computed(() => {
    return Object.values(displayResults.value).some((arr) => arr.length > 0)
  })

  /**
   * Computed: Total result count
   */
  const totalResultCount = computed(() => {
    return Object.values(results.value).reduce((sum, arr) => sum + arr.length, 0)
  })

  /**
   * Computed: Show recent searches (when no query and not loading)
   */
  const showRecentSearches = computed(() => {
    return !query.value.trim() && !isLoading.value && recentSearches.value.length > 0
  })

  /**
   * Computed: Show empty state
   */
  const showEmptyState = computed(() => {
    return query.value.trim() && !isLoading.value && !hasResults.value && !error.value
  })

  // Initialize recent searches from localStorage
  loadRecentSearches()

  return {
    // State
    isOpen,
    query,
    isLoading,
    activeScope,
    results,
    displayResults,
    recentSearches,
    error,
    activeIndex,
    expandedCategories,

    // Computed
    hasResults,
    totalResultCount,
    showRecentSearches,
    showEmptyState,
    flattenedResults,
    activeItem,

    // Actions
    open,
    close,
    toggle,
    setScope,
    setQuery,
    clearQuery,
    toggleCategory,
    isCategoryExpanded,
    addToRecentSearches,
    removeRecentSearch,
    clearRecentSearches,
    navigateDown,
    navigateUp,
    handleKeyboardShortcut,
  }
}
