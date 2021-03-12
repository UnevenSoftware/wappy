<template>
  <div class="mt-16 text-center">
    <div class="text-3xl font-bold  text-primarylight">
      How to Export Chats
    </div>
    <div class="p-4 rounded-lg shadow-lg space-y-6
      dark:bg-dark-bglayer-1 bg-light-bglayer-1">

      <span class=" text-primarylight text-md italic">NB: Media files aren't required to elaborate stats, you can export your chats when asked and upload only the txt file.</span>
        <!-- android -->
        <div class="text-2xl shadow-lg text-primarylight font-bold rounded-lg
           dark:bg-dark-bglayer-2 bg-light-bglayer-2">
          <div class="rounded-lg p-6 w-full flex">
              <i-cib-android-alt class="text-4xl text-primarylight "/>
              <span class="my-auto mx-6">On Android</span>
          </div>
            
          <ul class="text-lg text-left font-medium rounded-b-lg px-8 py-4 space-y-4
          dark:bg-dark-bglayer-3 bg-light-bglayer-3
          dark:text-dark-text text-light-text">
            <li><span class="text-accent">1. </span>Open the individual or group chat</li>
            <li class="flex flex-wrap break-all"><span class="text-accent">2. </span>Tap More options <i-fluent-more-vertical-28-filled class="text-accent my-auto"/> ➔ More ➔ Export chat.</li>
            <li><span class="text-accent">3. </span>Choose whether to export with media or without media.</li>
            <li><span class="text-accent">4. </span>Choose where to save your files. (If you have a <span class="text-accent">file explorer</span> app installed on your phone save it using the explorer and then import)</li>
          </ul>
        </div>

        <!-- apple -->
        <div class="text-2xl shadow-lg text-primarylight font-bold rounded-lg
           dark:bg-dark-bglayer-2 bg-light-bglayer-2">
          <div class="rounded-lg p-6 w-full flex">
              <i-cib-apple class="text-4xl text-primarylight "/>
              <span class="my-auto mx-6">On Iphone</span>
          </div>
            
          <ul class="text-lg text-left font-medium rounded-b-lg px-8 py-4 space-y-4
          dark:bg-dark-bglayer-3 bg-light-bglayer-3
          dark:text-dark-text text-light-text">
            <li><span class="text-accent">1. </span>Open the individual or group chat you’d like to save.</li>
            <li><span class="text-accent">2. </span>Tap the contact's name or group subject.</li>
            <li><span class="text-accent">3. </span>Tap Export Chat.</li>
            <li><span class="text-accent">4. </span>Select if you want to Attach Media or email the chat Without Media.</li>
            <li><span class="text-accent">4. </span>Open the  <span class="text-accent">file explorer</span> app. (You can also tap More for additional options.)</li>
          </ul>
        </div>

    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'HowToExportChat',
  setup(){
    return { }
  }
})
</script>