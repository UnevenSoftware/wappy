<template>
  <div class="p-4">
    <h1>weee</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const name = ref('')
    const router = useRouter()
    const go = () => {
      if (name.value) router.push(`/hi/${name.value}`)
    }

    return {
      go,
      name
    }
  }
})
</script>
