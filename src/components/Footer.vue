<template>
  <div class="p-8 min-w-full flex
    dark:bg-dark-bglayer-2 dark:text-primarylight
    bg-light-bglayer-2 text-primarydarker ">
      <span class="mx-auto">Made with ❤️ by <a class="font-bold" href="https://github.com/dnldsht">Donald</a> & <a class="font-bold" href="https://github.com/gilnd">Gilbert</a>!</span>
  </div>
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
