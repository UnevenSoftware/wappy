<template>
  <div class="p-4">
    <label>Total number of messages: {{ stats.count }}</label>
    <div v-if="stats.users">
      <div v-for="(stat, i) in stats.users" :key="i">
        <label>{{ stat.username }}: {{ stat.messagesCount }} messages</label>
      </div>
    </div>
    <bar-chart :chart-data="hoursData"></bar-chart>
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
  },
  computed: {
    hoursData() {
      const hours = this.stats.hours
      return {
        labels: Object.keys(hours),
        datasets: [
          {
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            label: '# Messages',
            data: Object.values(hours)
          }
        ]
      }
    }
  }
})
</script>