import path from 'path'
import Voie from 'vite-plugin-voie'
import ViteComponents from 'vite-plugin-components'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Voie(),
    ViteComponents({}),
  ]
})
