<template>
  <div class="space-y-8 dark:text-dark-text text-light-text">
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

    <div>
      <span class="mt-12 mb-6 text-4xl font-semibold">User Stats </span>
      <div v-if="stats.users" class="grid grid-auto-flow md:grid-cols-2 gap-2" 
        :class="stats.users.lenght > 1 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'"> 
        <div v-for="(stat, i) in stats.users" :key="i" class="">
          <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
            <div class="my-auto">
              
              <label class="font-bold text-xl" :style="`color: ${stringToHSL(stat.username)};`">{{ stat.username }} </label><br />
              <div class="grid grid-auto-flow grid-cols-2 gap-2">
                <div>
                  <span class="text-3xl font-bold mx-auto text-primarylight">{{ stat.messagesCount }} </span><br>
                  <span class="text-lg mx-auto"> ➔ <span class="text-accent">{{getPercentage(stats.count, stat.messagesCount)}}%</span> of total messages.</span>
                </div>
                <div>
                  <span class="text-3xl font-bold mx-auto text-primarylight"> {{stat.mediaCount}}</span><br>
                  <span class="text-lg "> ➔ <span class="text-accent">{{getPercentage(stat.messagesCount, stat.mediaCount)}}%</span> of your messages are shared Medias.</span>
                </div>
              </div>
<span class="text-lg "> ➔ <span class="text-accent">{{formatTime(stat.responseTime)}}</span> Medium Response time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark } from '~/utils'

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
    
    const stringToHSL = function(str: string){
      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
          hash = hash & hash;
      }
    	return `hsl(${hash % 360}, 100%, 
          ${isDark.value 
            ? 50 + Math.random()*50 
            : 25 + Math.random()*35 }%)`;
    }

    const formatTime = (s: number)=>{
      let hours   = Math.floor(s / 3600);
      let minutes = Math.floor((s - (hours * 3600)) / 60);
      let seconds = s - (hours * 3600) - (minutes * 60);
      
      return (((hours < 10) ? "0" + hours : hours) + ':' + 
        ((minutes < 10) ? "0" + minutes : minutes) + ':' + 
        ((seconds < 10) ? "0" + seconds : seconds));
    }

    return { getPercentage, stringToHSL, formatTime }
  }
})
</script>