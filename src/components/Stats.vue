<template>
  <div class="dark:text-dark-text text-light-text flex flex-col">
    <!-- CHAT STATS -->
    <span class="mt-8 mb-4 text-4xl font-semibold">{{ t('stats.chat') }}</span>
    <div class="rounded-lg p-6 shadow-lg space-y-10 dark:bg-dark-bglayer-2 bg-light-bglayer-2">
      <div class="grid-auto-flow md:grid-cols-2">
        <div class="my-auto text-center grid grid-cols-2 gap-2">
          <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3">
            <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
              {{ stats.messages }}</span
            >
            <br />
            <span class="mx-auto font-bold tabular-nums oldstyle-nums">{{ t('stats.messages') }}</span>
          </div>
          <div class="rounded-md p-6 shadow-lg text-2xl dark:bg-dark-bglayer-3 bg-light-bglayer-3">
            <span class="mx-auto text-5xl font-bold tabular-nums oldstyle-nums text-primarylight">
              {{ stats.medias }}</span
            >
            <br />
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
          <div
            v-for="(word, i) in stats.words"
            :key="i"
            :ref="setItemRef"
            class="px-2 py-4 rounded-md shadow-lg dark:bg-dark-bglayer-3 bg-light-bglayer-3 my-auto text-3xl font-bold flex"
          >
            <div class="ml-2 mr-8 text-primarylight my-auto">{{ word.count }}</div>
            <div class="my-auto">{{ word.word }}</div>
          </div>
        </div>
        <div
          class="mt-4 p-4 text-center text-xl rounded-lg w-full self-end border-2 shadow-lg dark:bg-dark-bgmessage_sender_quote dark:border-dark-bgmessage_sender bg-light-bgmessage_sender_quote border-light-bgmessage_sender"
        >
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
    <div
      v-if="stats.users"
      class="grid grid-auto-flow md:grid-cols-2 gap-2"
      :class="stats.users.length > 2 ? 'xl:grid-cols-3' : 'xl:grid-cols-2'"
    >
      <user-stats
        :ref="setItemRef"
        v-for="(userstats, i) in stats.users"
        :key="i"
        :globalstats="{ count: stats.count }"
        :userstats="userstats"
      >
      </user-stats>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getProfileEmoji, animeSlideUp } from '~/utils'
import UserStats from './UserStats.vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: { UserStats },
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  setup() {
    let itemRefs: [] = []
    const setItemRef = (el) => {
      if (el) {
        itemRefs.push(el)
      }
    }

    const { t } = useI18n()
    return { getProfileEmoji, setItemRef, itemRefs, t }
  },
  mounted() {
    for (const ref of this.itemRefs) {
      // console.log(ref)
      animeSlideUp(ref)
    }
  }
})
</script>