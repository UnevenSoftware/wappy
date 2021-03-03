<template>
  <div id="app" class="dark:bg-dark-bg bg-light-bg dark:text-dark-label text-light-text" 
    :style="getBgPattern()">
    <Header/>
    <router-view class="container mx-auto my-8"/> 
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '~/utils'
export default defineComponent({
  setup() {
    // Todo: Find a better way
    const getBgPattern = function(){
      return isDark.value
        ? 'background-image: linear-gradient(rgba(19, 28, 33, 0.9), rgba(19, 28, 33, 0.9)), url(./public/bg-dark.png);'
        : 'background-image: linear-gradient(rgba(223, 216, 208, 0.9), rgba(223, 216, 208, 0.9)), url(./public/bg-light.png);';
    }
    console.log(isDark);
    return { isDark, getBgPattern }
  }
})
</script>