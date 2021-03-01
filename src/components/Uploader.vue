<template>
  <div @dragover.prevent @drop.prevent @drop="handleFileDrop"
    class="border-2 border-dashed rounded-xl
    shadow-lg  font-semibold uppercase text-xl
    dark:bg-gray-900 dark:border-wablue
    bg-gray-200 border-wablue
    hover:bg-gray-300">
    <div class="rounded-xl p-8 cursor-pointer dark:hover:bg-gray-800
      text-center items-center" @click="inputClick">

      <div v-if="!loading">
        <div class="transform -scale-x-1">
              <i-ant-design-paper-clip-outlined class="text-6xl block mx-auto" />
        </div>
        <span class="">
          {{'Click to Upload Or Drag a File!'}}
        </span>
        <input ref="fileInput" class="hidden" type="file" @change="handleFileInput" accept=".txt" />
      </div>

      <div v-else>
        <div v-if="loading" class="animate-spin m-2 h-10 w-10 text-4xl block mx-auto">
          <i-mdi-loading/>
        </div>
        <span class="my-auto text-2xl italic font-light cursor-text">
          Elaborating your file!
        </span>
      </div>

    </div>
    <div v-if="fileSelected" class="px-8 py-4 rounded-b-xl 
      border-t-2 border-dashed border-wablue">
      <span class="my-auto">{{fileSelected.name}} | {{Math.round(fileSelected.size / 1024) || '>1'}} KB</span>
    </div>
  </div>

</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  props: {
    loading: Boolean
  },
  setup(){
    let fileSelected = ref();
    const fileInput = ref()

    const inputClick = function(){
      fileInput.value.click();
    }
    
    const handleFileDrop = function(e){
      if(!this.loadinng){
        let droppedFiles = e.dataTransfer.files;
        if(!droppedFiles) return;
        ([...droppedFiles]).forEach(f => {
          console.log(f)
          fileSelected.value = f;
          this.$emit('uploaded', fileSelected.value);
        });  
      }
    }

    const handleFileInput = function(e){ 
      if(!this.loading){
        let files = e.target.files
        if(!files) return;
        fileSelected.value = files[0];
        this.$emit('uploaded', fileSelected.value);
      }
    }

    return {fileSelected, inputClick, fileInput, handleFileDrop, handleFileInput }
  }
})
</script>