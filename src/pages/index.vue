<template>
  <div>
    
    <div v-if="!loading" class="mt-16">
      <label for="file-upload" class="
          shadow-lg rounded-md px-6 py-4 
          uppercase text-xl cursor-pointer
          border-2
          border-wateal font-semibold
          hover:bg-watealdark">
          {{!stats ? 'Upload your file' : 'Upload another file'}}
      </label>
      <input id="file-upload" type="file" @change="fileSelected" accept=".txt" />
    </div>
    <div v-if="!stats && loading" class="flex p-8 rounded-md border-2 border-wablue ">
      <Icon icon="mdi:loading" class="m-6 animate-spin text-5xl h-12 w-12 "/>  
      <span class="my-auto text-2xl italic font-light cursor-text ">Elaborating your file! </span>
    </div>
    <stats v-if="stats && !loading" :stats="stats"> </stats>
  </div>
</template>
<style scoped>
#file-upload {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent, watch } from 'vue'

import useStats from '/@/composable/useStats'

export default defineComponent({
  setup() {
    const { stats, readFile, loading } = useStats()

    watch(stats, (v) => console.log('stats', v))

    const fileSelected = (event: any) => {
      const f = event.target.files[0]
      if (f) {
        readFile(f)
      }
    }

    return {
      fileSelected,
      stats,
      loading
    }
  }
})
</script>
