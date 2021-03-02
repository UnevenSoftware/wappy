<template>
  <div class="space-y-8">
    <div class="mt-28">
      <span class="mt-12 mb-6 text-4xl">Total Stats: </span>
      <div class="rounded-xl border-2 border-walightgreen py-6 px-auto flex">
        <i-jam-messages class="m-6 text-5xl h-12 w-12" />
        <div class="my-auto">
          <label class="font-normal">Total Messages: </label><br />
          <span class="text-4xl font-bold tabular-nums oldstyle-nums">{{ stats.count }}</span>
        </div>
      </div>
      <bar-chart class="mt-2" :hours="stats.hours"></bar-chart>
    </div>

    <div>
      <span class="mt-12 mb-6 text-4xl font-semibold">User Stats:</span>
      <div v-if="stats.users" class="grid grid-auto-flow md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div v-for="(stat, i) in stats.users" :key="i" class="">
          <div class="py-2 px-4 rounded-md border-2 border-wateal flex">
            <i-mdi-face-man-profile class="mx-6 my-4 text-5xl h-12 w-12" />
            <div class="my-auto">
              <label class="font-bold text-2xl">{{ stat.username }} </label><br />
              <span class="text-4xl font-bold tabular-nums oldstyle-nums">{{ stat.messagesCount }} </span>
              <span class="text-xl"> messages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    // hoursData(): any {
    //   const hours = this.stats.hours
    //   return {
    //     labels: Object.keys(hours),
    //     datasets: [
    //       {
    //         backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //         label: '# Messages',
    //         data: Object.values(hours)
    //       }
    //     ]
    //   }
    // }
  }
})
</script>