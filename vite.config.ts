import path from 'path'
import Pages from 'vite-plugin-pages';
import ViteComponents from 'vite-plugin-components'
import Vue from '@vitejs/plugin-vue'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

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
    Vue(),
    Pages(),
    ViteComponents({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    WindiCSS(),
    VueI18n({
      include: path.resolve(__dirname, 'locales/**'),
    }),
  ]
})
