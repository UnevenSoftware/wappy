<template>
  <div class="text-center">
    <p>{{ t('not-found') }}</p>
    <div>
      <button class="btn m-3 text-sm mt-8" @click="home">Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const home = () => router.push({ name: 'index' })
</script>
