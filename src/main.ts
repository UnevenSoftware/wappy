import 'virtual:windi.css'
import './main.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

import routes from 'virtual:generated-pages';

import App from './App.vue'

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
  locale: 'en',
  messages
})

app.use(i18n)

app.mount('#app', true)
