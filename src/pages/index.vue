<template>
  <div class="p-4">
    <label for="file-upload" class="custom-file-upload"> Custom Upload </label>
    <input id="file-upload" type="file" @change="fileSelected" accept=".txt" />
  </div>
</template>
<style scoped>
#file-upload {
  visibility: hidden;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { Message, parseFileContent } from '/@/utils/parser'

import { ref } from 'vue'
// import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    // const file = ref(null)

    const readFile = (file) => {
      const reader = new FileReader()
      reader.addEventListener('load', (event) => {
        const content = event.target.result

        const messages: Message[] = parseFileContent(content)

        console.log(messages)
        // Do something with result
      })
      reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
          const percent = (event.loaded / event.total) * 100
          console.log(`Progress: ${Math.round(percent)}`)
        }
      })
      reader.readAsText(file)
    }

    // const router = useRouter()
    const fileSelected = (event: any) => {
      console.log(event.target.files)
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
