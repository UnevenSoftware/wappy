<template>
  <div>
    <uploader @uploaded="fileSelected" :loading="loading"></uploader>
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
    const { stats, readFile, loading } = useStats()

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
      loading
    }
  }
})
</script>
