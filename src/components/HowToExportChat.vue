<template>
  <div class="mt-10 text-center">
    <div class="p-4 rounded-lg shadow-lg space-y-6 dark:bg-dark-bglayer-1 bg-light-bglayer-1">
      <div class="flex flex-wrap lg:flex-no-wrap pt-2 dark:text-dark-text text-light-text text-md justify-center">
        <i-mdi-security class="my-auto mx-2" />
        <span class="my-auto">{{ t('export.security') }}</span>
      </div>
      <hr class="border-t-1 dark:border-primarydarker border-primarylight" />
      <div class="tex-center text-xl font-bold">{{ t('export.title') }}</div>

      <!-- android -->
      <div class="text-2xl shadow-lg text-primarylight font-bold rounded-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
        <div class="rounded-lg p-6 w-full flex">
          <i-cib-android-alt class="text-4xl text-primarylight" />
          <span class="my-auto mx-6">{{ t('export.android') }}</span>
        </div>

        <ul class="text-lg text-left font-medium rounded-b-lg px-8 py-4 space-y-4 
          dark:bg-dark-bglayer-3 bg-light-bglayer-3 dark:text-dark-text text-light-text">
          
          <li class="text-left font-light" v-for="i in [0,1,2,3]" :key="i" >
             <span v-html="t('export.android-steps['+i+']')"></span>
          </li>

        </ul>
      </div>

      <!-- apple -->
      <div class="text-2xl text-blue-500 shadow-lg text-primarylight font-bold rounded-lg dark:bg-dark-bglayer-2 bg-light-bglayer-2">
        <div class="rounded-lg p-6 w-full flex">
          <i-cib-apple class="text-4xl text-primarylight" />
          <span class="my-auto mx-6">{{ t('export.ios') }}</span>
        </div>

        <ul class="text-lg text-left text-blue-500 font-medium rounded-b-lg px-8 py-4 space-y-4 
          dark:bg-dark-bglayer-3 bg-light-bglayer-3 dark:text-dark-text text-light-text">
          <li class="text-left font-light" v-for="i in [0,1,2,3,4]" :key="i">
            <span v-html="t('export.ios-steps['+i+']')"></span>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HowToExportChat',
  setup() {
    const { t, i18n } = useI18n()
    return { t, i18n }
  }
})
</script>