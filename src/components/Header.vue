<template>

  <nav class="container shadow-lg mx-auto rounded-b-md p-4 flex font-semibold 
    dark:bg-dark-bglayer-2 dark:text-primarylight
    bg-light-bglayer-2 text-primarydarker">
    <span class="px-4 inline-block align-middle text-xl ">WhatsApp Analyzer</span>
    <div class="p-2 box-content icon-btn ml-auto rounded-full dark:hover:bg-dark-bglayer-1 hover:bg-light-bglayer-1" 
      @click="isDark = !isDark">
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
