<template>
  <div v-if="stats" class="p-4">
    <label>Total number of messages: {{ stats.count }}</label>
    <div v-if="stats.users">
      <div v-for="(stat, i) in stats.users" :key="i">
        <label>{{ stat.username }}: {{ stat.messagesCount }} messages</label>
      </div>
    </div>
  </div>
  <div v-else class="p-4">
    <label for="file-upload" class="btn custom-file-upload"> Upload your file </label>
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
