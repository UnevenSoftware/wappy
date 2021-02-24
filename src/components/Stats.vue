<template>
  <div class="p-4">
    <label>Total number of messages: {{ stats.count }}</label>
    <div v-if="stats.users">
      <div v-for="(stat, i) in stats.users" :key="i">
        <label>{{ stat.username }}: {{ stat.messagesCount }} messages</label>
      </div>
    </div>
    <div>{{ stats.hours }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
})
</script>