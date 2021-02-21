<template>
  <div class="p-4">
    <label for="file-upload" class="btn custom-file-upload"> Upload you file </label>
    <input id="file-upload" type="file" @change="fileSelected" accept=".txt" />
  </div>
</template>
<style scoped>
#file-upload {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import useStats from '/@/utils/useStats'

export default defineComponent({
  setup() {
    const { stats, readFile } = useStats()

    watch(stats, (v) => console.log('stats', v))

    const fileSelected = (event: any) => {
      const f = event.target.files[0]
      if (f) {
        readFile(f)
      }
    }

    return {
      fileSelected
    }
  }
})
</script>
