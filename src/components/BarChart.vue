
<script lang="ts">
import { defineComponent } from 'vue'
import { Bar } from 'vue3-chart-v2'

export default defineComponent({
  name: 'SportChart',
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      state: {
        chartData: {},
        chartOptions: {
          responsive: false
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.state.chartOptions)
  }
})
</script>