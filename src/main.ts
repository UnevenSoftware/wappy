import 'virtual:windi.css'
import './main.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

import routes from 'virtual:generated-pages';

import App from './App.vue'
import { createHead } from '@vueuse/head'
import { getUserLang } from './utils'

const app = createApp(App)

// Routing
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)

// i18n
const i18n = createI18n({
  legacy: false,
  locale: getUserLang('en'),
  fallbackLocale: 'en',
  messages
})

app.use(i18n)

// meta
app.use(createHead())


app.mount('#app', true)
