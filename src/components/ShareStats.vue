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
      class="invisible absolute fixed left-0 top-0 p-4 rounded-lg border-2
      dark:(bg-dark-bg text-dark-text  border-text-dark-bglayer-2) 
      bg-light-bg text-light-text  border-text-light-bglayer-2" 
        :style="getBgPattern()">




        <!-- General Stats-->
        <div class="m-2 p-6 space-y-6 rounded-lg dark:bg-dark-bglayer-1 bg-light-bglayer-1 ">
          <div class="rounded-lg  "> Made with <span class="text-primarylight">Wappy</span> 💌</div>
          
          <div>
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
          </div>

          <!--hours--->
          <div class="space-y-4">
            <span class="text-2xl mb-1 font-bold">{{ t('stats.hours') }}</span>
            <bar-chart class="" :hours="stats.hours"></bar-chart>
          </div>

        
          <span class="rounded-lg my-auto flex justify-end text-accent"> 💌 {{website}}</span>  
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
        backgroundColor: "rgba(0, 0, 0, 0)",
        scrollX: 0,
        scrollY: -window.scrollY,
        onclone: function(doc){
            console.log("doc", doc.getElementById("shareStatsContainer"));
            doc.getElementById("shareStatsContainer").classList.remove('invisible');
            doc.getElementById("shareStatsContainer").classList.add('visible');
        }
      }
      let canvas = await html2canvas(el, options);
      this.shareImg = canvas.toDataURL();
      
      /* download img */
      var link = document.createElement('a');
      link.href = this.shareImg;
      link.download = 'Download.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.loading = false;
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
