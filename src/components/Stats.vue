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
          <bar-chart class="" :hours="stats.hours"></bar-chart>
        </div>
        <!-- WORDS -->
        <div>
          <label class="mt-6 text-2xl font-bold text">Most used words </label><br />
          <div v-if="stats.users" class="grid mt-2 grid-auto-flow md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div v-for="(word, i) in stats.words" :key="i" :ref="setItemRef"
              class="px-2 py-4 rounded-md shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3 my-auto 
                text-3xl font-bold flex">
                <div class="ml-2 mr-8 text-primarylight my-auto">{{ word.count }}</div>
                <div class="my-auto">{{ word.word }}</div>
            </div>
          </div>
           <div class=" mt-4 p-4 text-center text-xl rounded-lg w-full self-end border-2 shadow-lg
            dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender 
            bg-light-bgmessage_sender_quote border-light-bgmessage_sender">
              "{{(stats.words.map(w => w.word)).join(" ")}}" -cit {{getProfileEmoji()}}
            </div>
        </div>       

        <!-- EMOJIS -->
        <div>
          <label class="mt-6 text-2xl font-bold">Most used emojis </label><br />
          <div v-if="stats.users" 
            class="mt-2 grid grid-auto-flow grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            <div v-for="(emoji, i) in stats.emoji" :key="i" :ref="setItemRef"
              :class="(i >= (stats.emoji.length -2)) ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''">
              <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3">
                  <label class=" font-bold text-3xl my-auto text-primarylight">{{ emoji.count }} </label><br />
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
        <user-stats :ref="setItemRef"
          v-for="(userstats, i) in stats.users" :key="i" 
          :globalstats="{count: stats.count }" :userstats="userstats">
        </user-stats>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { isDark, getProfileEmoji, animeSlideUp } from '~/utils'
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
    let itemRefs: [] = [];
    const setItemRef = (el) => {
      if (el) {
        itemRefs.push(el)
      }
    }
    
    return { getProfileEmoji, setItemRef, itemRefs }
  },
  mounted() {
    for(const ref of this.itemRefs){
      console.log(ref)
      animeSlideUp(ref);
    }
  },
})
</script>