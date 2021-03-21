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
      class="invisible absolute top-0 p-8 rounded-lg border-2
      dark:(bg-dark-bg text-dark-text  border-text-dark-bglayer-2) 
      bg-light-bg text-light-text  border-text-light-bglayer-2" 
        :style="getBgPattern()">
        
        {{stats}}

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
