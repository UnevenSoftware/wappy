<template>
  <div>
    <uploader @uploaded="fileSelected" :loading="loading"></uploader>
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
import Uploader from '~/components/Uploader.vue'

import useStats from '~/composable/useStats'

export default defineComponent({
  components: { Uploader },
  setup() {
    const { stats, readFile, loading } = useStats()

    watch(stats, (v) => console.log('stats', v))

    const fileSelected = (f: any) => {
      console.log("fileSelected: ", f)
      const file = f;
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
