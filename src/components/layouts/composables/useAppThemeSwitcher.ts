import { usePixelTheme } from '@mekari/pixel3-utils'
import { computed, nextTick } from 'vue'
import { useStorage } from '@vueuse/core'

const isAuto = useStorage('pixel-auto-theme', false)

export function useAppThemeSwitcher() {
  const { isDark, setDarkMode } = usePixelTheme()

  const isDarkMode = computed(() => isDark.value)
  const currentTheme = computed(() => {
    if (isAuto.value)
      return 'auto'

    return isDark.value ? 'dark' : 'light'
  })

  async function toggleDarkMode(value: boolean) {
    if (isDark.value === value)
      return

    const x = window.innerWidth
    const y = 0

    const enableTransition = 'startViewTransition' in document
      && window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    if (!enableTransition) {
      setDarkMode(value)
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )}px at ${x}px ${y}px)`,
    ]

    await (document as any).startViewTransition(async () => {
      setDarkMode(value)
      await nextTick()
    }).ready

    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 800,
        easing: 'ease-in-out',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
      },
    )
  }

  function watchOSTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (isAuto.value) {
        toggleDarkMode(e.matches)
      }
    }

    // Initial check
    handleChange(mediaQuery)

    // Watch for changes
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup function
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  function setTheme(value: 'auto' | 'dark' | 'light') {
    // Set auto theme flag
    isAuto.value = value === 'auto'

    // For auto theme, check system dark mode preference
    if (value === 'auto') {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      toggleDarkMode(prefersDarkMode)
      return
    }

    // For explicit light/dark themes
    toggleDarkMode(value === 'dark')
  }

  return {
    toggleDarkMode,
    isDarkMode,
    watchOSTheme,
    isAuto,
    currentTheme,
    setTheme,
  }
}
