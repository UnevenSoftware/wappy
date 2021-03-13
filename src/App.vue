<template>
  <div
    id="app"
    class="dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text max-w-screen overflow-hidden"
    :style="getBgPattern()"
  >
    <Header />
    <router-view class="container p-2 my-8 mx-auto min-h-screen" />
    <Footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '~/utils'
export default defineComponent({
  setup() {
    // Todo: Find a better way
    const getBgPattern = function () {
      return isDark.value
        ? 'background-image: linear-gradient(rgba(19, 28, 33, 0.9), rgba(19, 28, 33, 0.9)), url(bg-dark.png);'
        : 'background-image: linear-gradient(rgba(223, 216, 208, 0.9), rgba(223, 216, 208, 0.9)), url(bg-light.png);'
    }
    return { isDark, getBgPattern }
  }
})
</script>