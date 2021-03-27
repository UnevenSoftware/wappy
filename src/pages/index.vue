<template>
  <div>
    <uploader ref="uRef" @uploaded="fileSelected" :loading="loading" :error="error"></uploader>
    <div class="dark:text-dark-text text-light-text text-center mt-3 text-sm"></div>

    <div
      ref="errRef"
      v-if="error"
      class="p-6 my-4 rounded-lg text-lg font-semibold text-red-900 bg-red-500 flex flex-wrap lg:flex-no-wrap justify-center">
      <i-fluent-document-error-20-filled class="my-auto mx-2 w-6 h-6" />
      <span class="my-auto">{{ error }}</span>
    </div>

    <stats v-if="stats && !loading" :stats="stats"> </stats>
    
    <how-to-export-chat v-show="!stats && !loading" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import useStats from '~/composable/useStats'
import { animeSlideUp, mockStats } from '~/utils'

export default defineComponent({
  mounted() {
    // animeSlideUp(this.uRef)
  },
  setup() {
    const uRef = ref()
    const errRef = ref()

    let { stats, readFile, loading, error } = useStats(mockStats(/*true*/))

    watch(error, async function (e) {
      console.log('event', e)
      animeSlideUp(errRef)
    })

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
      error,
      uRef,
      errRef,
      animeSlideUp
    }
  }
})
</script>
