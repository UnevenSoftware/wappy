<template>
  <div class="my-auto w-full p-6 rounded-md shadow-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
    
    <label class="font-bold text-2xl" :style="`color: ${stringToHSL(userstats.username)};`">{{ userstats.username }} </label><br />

    <div>
      <div class="p-2 mt-4 rounded-md w-full dark:bg-dark-bgmesaage_sender_quote bg-light-bgmesaage_sender_quote">
        <div class="text-4xl text-center flex font-bold mx-auto text-primarylight">
          <i-bx-bxs-message-alt-detail class="text-2xl mx-2 my-auto" />
          {{ userstats.messagesCount }} 
        </div>
        <div class="text-lg mx-auto p-2 rounded-md w-full dark:bg-dark-bgmessage_sender bg-light-bgmessage_sender  "> ➔ <span class="text-accent">{{getPercentage(globalstats.count, userstats.messagesCount)}}%</span> of total messages.</div>
      </div>
      <div class="p-2 mt-4 rounded-md w-full dark:bg-dark-bgmesaage_sender_quote bg-light-bgmesaage_sender_quote">
        <div class="text-4xl text-center flex font-bold mx-auto text-primarylight">
          <i-codicon-file-media class="text-2xl mx-2 my-auto" />
          {{ userstats.mediaCount }} 
        </div>
        <div class="text-lg mx-auto p-2 rounded-md w-full dark:bg-dark-bgmessage_sender bg-light-bgmessage_sender  "> 
            ➔ <span class="text-accent">{{getPercentage(userstats.messagesCount, userstats.mediaCount)}}%</span> of your messages are shared Medias.
        </div>
      </div>
      
    </div>
    <div class="p-2 mt-4 rounded-md w-full border-2 dark:bg-dark-bgmessage_sender dark:border-dark-bgmesaage_sender_quote bg-light-bgmessage_sender  border-light-bgmesaage_sender_quote">
      <span class="text-lg "> ➔ <span class="text-accent">{{formatTime(userstats.responseTime)}}</span> Medium Response time.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark, stringToHSL, formatTime, getPercentage } from '~/utils'

export default defineComponent({
  props: {
    globalstats: {
      type: Object,
      required: true
    },
    userstats: {
      type: Object,
      required: true
    }
  },
  setup() {
    return { stringToHSL, formatTime, getPercentage }
  }
})
</script>