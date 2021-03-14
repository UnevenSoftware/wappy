<template>
  <div>
    <uploader ref='uRef' 
      @uploaded="fileSelected" 
      :loading="loading" 
      :error="error"
      class="opacity-0"></uploader>

    <div ref='errRef' v-if="error" 
      class="p-6 my-4 rounded-lg text-lg font-semibold 
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
import { ref, defineComponent, watch, nextTick  } from 'vue'
import useStats from '~/composable/useStats'
import {animeSlideUp} from '~/utils'

export default defineComponent({
  mounted(){
    animeSlideUp(this.uRef);
  },
  setup() {
    const uRef = ref()
    const errRef = ref()
    let { stats, readFile, loading, error } = useStats()
    
    watch(error, async function(e){
      console.log("event" ,e)
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
