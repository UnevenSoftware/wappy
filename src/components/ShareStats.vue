<template>
  <div>

    <!--Share Stats-->
    <div id="shareStatsContainer" ref="shareStatsRef" 
      class="invisible absolute fixed left-0 top-0 p-4 rounded-lg border-2
      dark:(bg-dark-bg text-dark-text  border-text-dark-bglayer-2) 
      bg-light-bg text-light-text  border-text-light-bglayer-2" 
      :style="getBgPattern()">


      <div class="m-2 p-6 space-y-6 rounded-lg dark:bg-dark-bglayer-1 bg-light-bglayer-2 shadow-lg ">
        <span class="text-2xl m-2 text-primarylight justify-center flex font-bold"> {{ getChatName() }}</span>
        <!-- General Stats-->
        <div v-if="screenshots[selectedScreenshot] === 'General'">
            <!--Messages-->
            <div class="flex items-center">
              <div class="flex flex-col">
                <span class="text-2xl mb-0"> {{ t('stats.messages') }}</span>
                <span class="text-base text-light-label text-sm dark:text-dark-label pb-1">
                  <span class="text-accent"> {{ getPercentage(stats.count, stats.messages) }}%</span>
                    {{ t('stats.of-chat') }}
                  </span>
              </div>
              <div class="text-4xl ml-auto text-center items-end flex font-bold text-primarylight">
                {{ stats.messages }} {{getProfileEmoji()}}
              </div>
            </div>
            <!---line-->
            <hr class="border-t-1 my-2 dark:border-primarydarker border-primarylight" />
            <!--Medias-->  
            <div class="flex items-center">
              <div class="flex flex-col">
                <span class="text-2xl mb-0"> {{ t('stats.media') }}</span>
                <span class="text-base text-light-label text-sm dark:text-dark-label pb-1">
                  <span class="text-accent"> {{ getPercentage(stats.count, stats.medias) }}%</span>
                    {{ t('stats.of-chat') }}
                  </span>
              </div>
              <div class="text-4xl ml-auto text-center items-end flex font-bold text-primarylight">
                {{ stats.medias }} {{getProfileEmoji()}}
              </div>
            </div>

          <!--hours--->
          <div class="space-y-4">
            <span class="text-2xl mb-1 font-bold">{{ t('stats.hours') }}</span>
            <bar-chart class="" :hours="stats.hours"></bar-chart>
          </div>
        </div>  
        <!-- END General Stats -->

        <div v-if="screenshots[selectedScreenshot] === 'Words'">
            <label class="mt-6 text-2xl font-bold text">{{ t('stats.words') }} </label><br />
            <div v-if="stats.users" class="grid mt-2 grid-auto-flow grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <div v-for="(word, i) in stats.words"
                :key="i"
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
          

            <!-- EMOJIS -->
            <label class="mt-6 text-2xl font-bold">{{ t('stats.emojis') }} </label><br />
            <div v-if="stats.users" class="mt-2 grid grid-auto-flow grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <div
                v-for="(emoji, i) in stats.emoji"
                :key="i"
                :class="i >= stats.emoji.length - 2 ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''">
                <div class="p-6 rounded-md flex shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3">
                  <label class="font-bold text-3xl my-auto text-primarylight">{{ emoji.count }} </label><br />
                  <span class="text-3xl mx-auto my-auto font-bold">{{ emoji.word }} </span>
                </div>
              </div>
            </div>
        </div>

        <div v-if="screenshots[selectedScreenshot] === 'Users'">
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


        <!-- screenshot footer -->
        <div class="rounded-lg "> Made with <span class="text-primarylight">Wappy</span> 💌</div>  
        <!--<span class="rounded-lg my-auto flex justify-end text-accent"> 💌 {{website}}</span>  -->
      </div>

    </div>
    <!--<img  class="my-16 rounded-lg" v-if="shareImg" :src="shareImg"/>-->




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

    <div class="flex space-x-8">
      
      
      <div class="mt-6 p-6 w-full text-center text-xl rounded-xl border-2 shadow-lg cursor-pointer
        dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender 
        dark:hover:border-dark-bgmessage_sender_quote dark:hover:bg-dark-bgmessage_sender
        dark:text-dark-text text-light-text
        bg-light-bgmessage_sender_quote border-light-bgmessage_sender
        hover:border-light-bgmessage_sender_quote hover:bg-light-bgmessage_sender transform scale-x-n1"
          @click="(selectedScreenshot -1 >= 0) ? selectedScreenshot -= 1 : selectedScreenshot = screenshots.length-1">
          <i-grommet-icons-form-next-link class="dark:text-dark-icon text-light-icon mx-4 "/>
      </div>



      <div class="mt-6 p-6 w-full text-center text-xl rounded-xl border-2 shadow-lg cursor-pointer
        dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender 
        dark:hover:border-dark-bgmessage_sender_quote dark:hover:bg-dark-bgmessage_sender
        dark:text-dark-text text-light-text
        bg-light-bgmessage_sender_quote border-light-bgmessage_sender
        hover:border-light-bgmessage_sender_quote hover:bg-light-bgmessage_sender"
          @click="(selectedScreenshot +1 < screenshots.length) ? selectedScreenshot += 1 : selectedScreenshot = 0">
          <i-grommet-icons-form-next-link class="dark:text-dark-icon text-light-icon mx-4"/>
      </div>
      
    </div>  

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isDark, getProfileEmoji, getPercentage, containerScreenShot, downloadImage } from '~/utils'

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
      loading: false,
      screenshots: ["General", "Words", "Users"],
      selectedScreenshot: 0,
    }
  },
  methods: {
    async share(){
      this.loading = true;
      downloadImage(await containerScreenShot(this.shareStatsRef));
      this.loading = false;
    },
    getChatName(){
        return this.stats.filename.replace('.txt', '');
    }
  },
  setup() {
    let shareStatsRef = ref();
    const { t } = useI18n()
    const website = document.URL;
    const getBgPattern = function () {
      return isDark.value
        ? 'background-image: linear-gradient(rgba(19, 28, 33, 0.9), rgba(19, 28, 33, 0.9)), url(bg-dark.png);'
        : 'background-image: linear-gradient(rgba(223, 216, 208, 0.9), rgba(223, 216, 208, 0.9)), url(bg-light.png);'
    }

    return { shareStatsRef , t, getBgPattern, getProfileEmoji, getPercentage, website};
  },
})
</script>
