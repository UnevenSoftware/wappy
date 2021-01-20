<template>
  <div class="p-4">
    <p>Idea <b> {{ name }}</b></p>
    <p class="text-sm opacity-50">
      
    </p>

    <div>
      <button class="btn  text-sm mt-8" @click="back">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: String
  },
  setup() {
    const router = useRouter()
    const back = () => router.push('/')

    return {
      back
    }
  }
})
</script>
