import { PixelPlugin, type PixelPluginConfig } from '@mekari/pixel3'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

import './pixel.css'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes: (routes) => {
    return routes
  },
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

const app = createApp(App)

app.use(PixelPlugin, {
  tooltipDirective: true,
  pixelTheme: true
} as PixelPluginConfig)

app.use(router)
app.mount('#app')
