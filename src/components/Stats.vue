<template>
  <div class="space-y-8">
    <div class="mt-12">
      <span class="mt-12 mb-6 text-4xl font-semibold">Total Stats: </span>
      <div class="rounded-lg p-6 shadow-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
        <div class="flex">
          <i-jam-messages class="m-6 text-5xl h-12 w-12" />
          <div class="my-auto">
            <label class="font-normal">Total Messages: </label><br />
            <span class="text-4xl font-bold tabular-nums oldstyle-nums">{{ stats.count }}</span>
          </div>
        </div>
        <span class="text-lg font-bold">Hours Distribution:</span>
        <bar-chart class="mt-2" :hours="stats.hours"></bar-chart>
        <div v-if="stats.users" class="grid mt-2 grid-auto-flow md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div v-for="(word, i) in stats.words" :key="i" class="">
            <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3">
              <div class="my-auto">
                <label class="font-bold text-xl text-primarylight">{{ word.count }} </label><br />
                <span class="text-3xl font-bold">{{ word.word }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <span class="mt-12 mb-6 text-4xl font-semibold">User Stats:</span>
      <div v-if="stats.users" class="grid grid-auto-flow md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div v-for="(stat, i) in stats.users" :key="i" class="">
          <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
            <div class="my-auto">
              <label class="font-bold text-xl text-primarylight">{{ stat.username }} </label><br />
              <span class="text-3xl font-bold">{{ stat.messagesCount }} </span>
              <span class="text-lg"> / {{ getPercentage(stats.count, stat.messagesCount) }}%</span>
              <span class="text-xl"> messages.</span>
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
  setup() {
    const getPercentage = function (max: number, value: number) {
      return ((value / max) * 100).toFixed(2)
    }
    return { getPercentage }
  }
})
</script>