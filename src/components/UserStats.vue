<template>
  <div class="my-auto w-full h-full p-6 rounded-md shadow-lg flex flex-col dark:bg-dark-bglayer-2 bg-light-bglayer-2">
    <label class="font-bold text-2xl" :style="`color: ${stringToHSL(userstats.username)};`"
      >{{ userstats.username }} {{ getProfileEmoji() }}</label
    ><br />

    <div class="dark:bg-dark-bgmessage_sender bg-light-bgmessage_sender rounded-lg">
      <div class="p-2 mt-4 rounded-md w-full">
        <div class="text-4xl text-center flex font-bold mx-auto text-primarylight">
          <i-bx-bxs-message-alt-detail class="text-2xl mx-2 my-auto" />
          {{ userstats.messagesCount }}
        </div>
        <div
          class="text-lg mx-auto p-2 rounded-md w-full dark:bg-dark-bgmessage_sender_quote bg-light-bgmessage_sender_quote"
        >
          ➔ <span class="text-accent">{{ getPercentage(globalstats.count, userstats.messagesCount) }}%</span> of total
          messages.
        </div>
      </div>
      <div class="p-2 mt-4 rounded-md w-full">
        <div class="text-4xl text-center flex font-bold mx-auto text-primarylight">
          <i-eva-image-2-fill class="text-2xl mx-2 my-auto" />
          {{ userstats.mediaCount }}
        </div>
        <div
          class="text-lg mx-auto p-2 rounded-md w-full dark:bg-dark-bgmessage_sender_quote bg-light-bgmessage_sender_quote"
        >
          ➔ <span class="text-accent">{{ getPercentage(userstats.messagesCount, userstats.mediaCount) }}%</span> of your
          messages are shared Medias.
        </div>
      </div>
    </div>
    <div
      class="p-2 mt-4 rounded-lg w-full self-end border-2 dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender bg-light-bgmessage_sender_quote border-light-bgmessage_sender"
    >
      <div class="rounded-lg flex">
        <i-bx-bx-timer class="text-2xl mx-2 my-auto text-primarylight" />
        <span class="text-lg">
          <span class="text-accent">{{ formatTime(userstats.responseTime) }}</span> Medium Response time.</span
        >
      </div>
    </div>
    <div
      class="p-2 mt-4 rounded-lg w-full self-end border-2 dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender bg-light-bgmessage_sender_quote border-light-bgmessage_sender"
    >
      <div class="rounded-lg flex">
        <i-bx-bx-timer class="text-2xl mx-2 my-auto text-primarylight" />
        <span class="text-lg">
          <span class="text-accent">Started {{ userstats.startedConversations }}</span> Conversations.</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isDark, stringToHSL, formatTime, getPercentage, getProfileEmoji } from '~/utils'

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
    return { stringToHSL, formatTime, getPercentage, getProfileEmoji }
  }
})
</script>