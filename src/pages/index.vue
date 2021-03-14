<template>
  <div>
    <uploader @uploaded="fileSelected" :loading="loading" :error="error"></uploader>

    <div v-if="error" class="p-6 my-4 rounded-lg text-lg font-semibold 
      text-red-900 bg-red-500
      flex flex-wrap lg:flex-no-wrap justify-center">
      <i-fluent-document-error-20-filled class="my-auto mx-2 w-6 h-6"/>
      <span class="my-auto">{{error}}</span>
    </div>

    <stats v-if="stats && !loading" :stats="stats"> </stats>
    <how-to-export-chat v-if="!stats && !loading"/>
  </div>
</template>
<style scoped>
#file-upload {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import useStats from '~/composable/useStats'

export default defineComponent({
  setup() {
    let { stats, readFile, loading, error } = useStats()
    // watch(stats, (v) => console.log('stats', v))

    const fileSelected = (f: any) => {
      const file = f
      if (file) {
        readFile(file)
      }
    }

    return {
      fileSelected,
      stats,
      loading,
      error
    }
  }
})
</script>
