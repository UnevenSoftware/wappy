<template>
  <div ref="el" :class="$attrs.class" style="vertical-align: text-bottom" />
</template>

<script  lang="ts">
import { watch, ref, onMounted, nextTick, defineProps, defineComponent } from 'vue'
import Iconify from '@purge-icons/generated'

export default defineComponent({
  props: {
    icon: {
        type: String,
        required: true,
    },
  },
  setup(props) {
  
    const el = ref(null)

    const update = async () => {
      if (!el.value) return void 0
      const svg = Iconify.getSVG(props.icon, {})
      if (!svg) {
        console.warn(`icon ${props.icon} not found`)
        return void 0
      }
      
      el.value.innerHTML = svg
    }
    
    watch(() => props.icon, update, { flush: 'post' })
    onMounted(update)
    return { el }
  }
})

</script>

<style>
span.iconify {
  background: #5551;
  border-radius: 100%;
  min-width: 1em;
  min-height: 1em;
  display: block;
}
</style>