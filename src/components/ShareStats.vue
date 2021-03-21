<template>
  <div>
    <div class="flex justify-center">
      <div class="mt-8 p-6 sm:w-full md:w-auto text-center rounded-xl border-2 shadow-lg cursor-pointer
        dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender 
        dark:hover:border-dark-bgmessage_sender_quote dark:hover:bg-dark-bgmessage_sender
        bg-light-bgmessage_sender_quote border-light-bgmessage_sender
        hover:border-light-bgmessage_sender_quote hover:bg-light-bgmessage_sender"
          @click="share()">
          <i-dashicons-share class="text-xl"/> <span class="text-xl font-bold">{{t('share')}}</span>
      </div>
    </div>
    <!--Share Stats-->
    <div id="shareStatsContainer" ref="shareStatsRef" 
      class="invisible absolute reounded-lg p-8 top-0 border-2 border-primarylight
      dark:(bg-dark-bg text-dark-text) 
      bg-light-bg text-light-text"
        :style="getBgPattern()">
      {{stats}}
    </div>
    <img  class="my-16 rounded-lg" v-if="shareImg" :src="shareImg"/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { isDark, getProfileEmoji } from '~/utils'
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
      shareImg: null
    }
  },
  methods: {
    async share(){
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

    return { shareStatsRef , t, getBgPattern};
  },
})
</script>
