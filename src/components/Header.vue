<template>
  <nav class="p-4 flex">
    <h1 class="text-xl">WhatsApp Analyzer</h1>
    <div class="icon-btn ml-auto" @click="isDark = !isDark">
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
