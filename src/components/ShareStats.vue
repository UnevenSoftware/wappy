<template>
  <div>
    <div class="flex justify-center">
      <div class="mt-6 p-6 w-full text-center text-xl rounded-xl border-2 shadow-lg cursor-pointer
        dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender 
        dark:hover:border-dark-bgmessage_sender_quote dark:hover:bg-dark-bgmessage_sender
        dark:text-dark-text text-light-text
        bg-light-bgmessage_sender_quote border-light-bgmessage_sender
        hover:border-light-bgmessage_sender_quote hover:bg-light-bgmessage_sender"
          @click="!loading ? share() : {}">
          
          <div v-if="!loading" class="my-auto">
            <i-dashicons-share class="dark:text-dark-icon text-light-icon mx-4"/><span>{{t('share')}}</span>
          </div>

          <div v-else>
            <i-mdi-loading class="dark:text-dark-icon text-light-icon animate-spin h-6 w-6 mx-4" />
            <span> {{ t('uploader.loading') }}</span>
          </div>

      </div>
    </div>
    <!--Share Stats-->
    <div id="shareStatsContainer" ref="shareStatsRef" 
      class="invisible absolute bottom-auto rounded-lg w-full h-full p-8  border-2 border-primarylight
      dark:(bg-dark-bg text-dark-text) 
      bg-light-bg text-light-text"
        :style="getBgPattern()">
        


  <div class="dark:text-dark-text text-light-text flex flex-col">
    <!-- CHAT STATS -->
    <span class="mt-8 mb-4 text-4xl font-semibold">{{ t('stats.chat') }}</span>
    <div class="rounded-lg p-6 shadow-lg space-y-10 dark:bg-dark-bglayer-2 bg-light-bglayer-2">
      <div class="grid-auto-flow md:grid-cols-2">
        <div class="my-auto text-center grid grid-cols-2 gap-2">
          <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3">
            <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
              {{ stats.messages }}</span>
            <br/>
            <span class="mx-auto font-bold tabular-nums oldstyle-nums">{{ t('stats.messages') }}</span>
          </div>
          <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3">
            <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
              {{ stats.medias }}
            </span>
            <br/>
            <span class="mx-auto font-bold tabular-nums oldstyle-nums">{{ t('stats.media') }}</span>
          </div>
        </div>
      </div>

      <!-- Hours Distribution -->
      <div class="space-y-4">
        <span class="text-2xl mb-1 font-bold">{{ t('stats.hours') }}</span>
        <bar-chart class="" :hours="stats.hours"></bar-chart>
      </div>

      <!-- WORDS -->
      <div>
        <label class="mt-6 text-2xl font-bold text">{{ t('stats.words') }} </label><br />
        <div v-if="stats.users" class="grid mt-2 grid-auto-flow md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div v-for="(word, i) in stats.words"
            :key="i"
            :ref="setItemRef"
            class="px-2 py-4 rounded-md shadow-lg dark:bg-dark-bglayer-3 
            bg-light-bglayer-3 my-auto text-3xl font-bold flex">
              <div class="px-4  text-primarylight my-auto">{{ word.count }}</div>
              <div class="my-auto">{{ word.word }}</div>
          </div>
        </div>
        <div class="my-4 p-4 text-center text-xl rounded-lg w-full self-end border-2 shadow-lg 
          dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender bg-light-bgmessage_sender_quote 
          border-light-bgmessage_sender">
            "{{ stats.words.map((w) => w.word).join(' ') }}" -cit {{ getProfileEmoji() }}
        </div>
      </div>

      <!-- EMOJIS -->
      <div>
        <label class="mt-6 text-2xl font-bold">{{ t('stats.emojis') }} </label><br />
        <div v-if="stats.users" class="mt-2 grid grid-auto-flow grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <div
            v-for="(emoji, i) in stats.emoji"
            :key="i"
            :ref="setItemRef"
            :class="i >= stats.emoji.length - 2 ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''"
          >
            <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3">
              <label class="font-bold text-3xl my-auto text-primarylight">{{ emoji.count }} </label><br />
              <span class="text-3xl mx-auto my-auto font-bold">{{ emoji.word }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- USER STATS -->
    <span class="mt-8 mb-4 text-4xl font-semibold">{{ t('stats.user.title') }} </span>
    <div v-if="stats.users"
      class=" grid grid-auto-flow md:grid-cols-2 gap-2"
      :class="stats.users.length > 2 ? 'xl:grid-cols-3' : 'xl:grid-cols-2'">
      <user-stats
        :ref="setItemRef"
        v-for="(userstats, i) in stats.users"
        :key="i"
        :globalstats="{ count: stats.count }"
        :userstats="userstats">
      </user-stats>
    </div>
  </div>














    </div>
    <img  class="my-16 rounded-lg" v-if="shareImg" :src="shareImg"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isDark, getProfileEmoji, getPercentage } from '~/utils'
import html2canvas from 'html2canvas';

export default defineComponent({
  props: {
  stats: {
      type: Object,
      required: true
    } 
  },
  data(){
    return {
      shareImg: null,
      loading: false
    }
  },
  methods: {
    async share(){
      this.loading = true;
      const el = this.shareStatsRef;
      let options = {
        scrollX: -9,
        scrollY: -(window.scrollY) ,
        onclone: function(doc){
            console.log("doc", doc.getElementById("shareStatsContainer"));
            doc.getElementById("shareStatsContainer").classList.remove('invisible');
            doc.getElementById("shareStatsContainer").classList.add('visible');
        }
      }
      let canvas = await html2canvas(el, options);
      this.shareImg = canvas.toDataURL();
      this.loading = false;
    }
  },
  setup() {
    let shareStatsRef = ref();
    const { t } = useI18n()

    const getBgPattern = function () {
      return isDark.value
        ? 'background-image: linear-gradient(rgba(19, 28, 33, 0.9), rgba(19, 28, 33, 0.9)), url(bg-dark.png);'
        : 'background-image: linear-gradient(rgba(223, 216, 208, 0.9), rgba(223, 216, 208, 0.9)), url(bg-light.png);'
    }

    return { shareStatsRef , t, getBgPattern, getProfileEmoji, getPercentage};
  },
})
</script>
