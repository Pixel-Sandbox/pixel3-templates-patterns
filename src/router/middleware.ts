import type { Router } from 'vue-router'
import { usePixelTheme } from '@mekari/pixel3-utils'

export function setupMiddleware(router: Router) {
  const { setProductTheme } = usePixelTheme()

  // Enterprise layout requires `data-product-theme="enterprise"` attribute on <html>
  // to apply its distinct semantic color tokens.
  // Other layouts use the default color tokens, so we reset it when navigating away.
  router.beforeEach((to) => {
    const isEnterprise = to.path.startsWith('/templates/layouts/enterprise')
    setProductTheme(isEnterprise ? 'enterprise' : '')
  })
}
