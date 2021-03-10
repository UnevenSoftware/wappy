<template>
  <div class="space-y-8 dark:text-dark-text text-light-text">
    
    <!-- CHAT STATS -->
    <div class="mt-12">
      <span class="mt-12 mb-6 text-4xl font-semibold ">Chat Stats </span>
      <div class="rounded-lg p-6 shadow-lg space-y-10 dark:bg-dark-bglayer-2 bg-light-bglayer-2">
        <div class="grid-auto-flow md:grid-cols-2">
          <div class=" my-auto text-center grid grid-cols-2 gap-2">
            <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3 ">
              <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
                {{ stats.messages }}</span>
              <br/>
              <span class="mx-auto font-bold tabular-nums oldstyle-nums ">Total Messages</span>
            </div>
            <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3">
              <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
                {{ stats.medias }}</span>
              <br/>
              <span class="mx-auto font-bold tabular-nums oldstyle-nums ">Total Medias</span>
            </div>
          </div>
        </div>
        
        <!-- Hours Distribution -->
        <div>
          <span class="text-2xl font-bold">Hours Distribution</span>
          <bar-chart class="mt-2" :hours="stats.hours"></bar-chart>
        </div>
        <!-- WORDS -->
        <div>
          <label class="mt-6 text-2xl font-bold text">Most used words </label><br />
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

        <!-- EMOJIS -->
        <div>
          <label class="mt-6 text-2xl font-bold">Most used emojis </label><br />
          <div v-if="stats.users" class="grid mt-2 grid-auto-flow grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <div v-for="(emoji, i) in stats.emoji" :key="i" class="">
              <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3">
                  <label class="font-bold text-2xl my-auto text-primarylight">{{ emoji.count }} </label><br />
                  <span class="text-3xl mx-auto my-auto font-bold">{{ emoji.word }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- USER STATS -->
    <div>
      <span class="mt-12 mb-6 text-4xl font-semibold">User Stats </span>
      <div v-if="stats.users" class="grid grid-auto-flow md:grid-cols-2 gap-2" 
        :class="stats.users.length > 2  ? 'xl:grid-cols-3' : 'xl:grid-cols-2'"> 
        <user-stats 
          v-for="(userstats, i) in stats.users" :key="i" 
          :globalstats="{count: stats.count }" :userstats="userstats">
        </user-stats>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '~/utils'
import UserStats from './UserStats.vue'

export default defineComponent({
  components: { UserStats },
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  setup() {
    return { }
  }
})
</script>