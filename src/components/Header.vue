<template>
  <nav class="p-4 flex">
    <h1 class=" text-xl">ἰδέα</h1>
    <div class="icon-btn ml-auto" @click="isDark = !isDark">
      <Icon :icon="isDark ? 'carbon:moon' : 'carbon:sun'" class="inline-block" />
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '/@/utils'

export default defineComponent({
  setup() {
    return { isDark }
  }
})
</script>
