<template>
  <nav
    class="container items-center shadow-lg mx-auto rounded-b-md p-4 flex font-semibold dark:bg-dark-bglayer-2 dark:text-primarylight bg-light-bglayer-2 text-primarydarker"
  >
    <span class="px-4 inline-block align-middle text-xl">WhatsApp Analyzer</span>
    <a
      class="p-2 box-content icon-btn ml-auto rounded-full dark:hover:bg-dark-bglayer-1 hover:bg-light-bglayer-1"
      href="https://github.com/UnevenSoftware/wappy"
      target="_blank"
    >
      <i-carbon-logo-github></i-carbon-logo-github>
    </a>

    <div
      class="p-2 box-content icon-btn ml-2 rounded-full dark:hover:bg-dark-bglayer-1 hover:bg-light-bglayer-1"
      @click="isDark = !isDark"
    >
      <i-carbon-moon v-if="isDark"></i-carbon-moon>
      <i-carbon-sun v-else></i-carbon-sun>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '~/utils'

export default defineComponent({
  setup() {
    return { isDark }
  }
})
</script>
