import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { getTemplatesRoutes } from './src/templates/routes'
import { getPatternRoutes } from './src/patterns/routes'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    VueRouter({
      routesFolder: [
        'src/pages',
        ...getPatternRoutes(),
        ...getTemplatesRoutes(),
      ],
    }),
    vue(),
    vueJsx(),
    visualizer({
      template: 'treemap', // or sunburst
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }),
  ],
})
