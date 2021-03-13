import path from 'path'
import Voie from 'vite-plugin-voie'
import ViteComponents from 'vite-plugin-components'
import vue from '@vitejs/plugin-vue'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

import { defineConfig } from 'vite'

const base = '/WAnalyzer'

export default defineConfig({
  base: `${base}/`,
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Voie({
      extendRoute: (route, _) => {
        route.path = `${base}${route.path}`
      }
    }),
    ViteComponents({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons()
  ]
})
