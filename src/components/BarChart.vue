<template>
  <apexchart width="400" type="bar" :options="chartOptions" :series="series"></apexchart>
</template>
<script lang="ts">
import ApexCharts from 'vue3-apexcharts'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { apexchart: ApexCharts },
  name: 'MessagesChart',
  props: {
    hours: {
      type: Object,
      required: true
    }
  },
  computed: {
    series(): any {
      return [
        {
          name: 'series-1',
          data: Object.values(this.hours)
        }
      ]
    },
    chartOptions(): any {
      return {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: Object.keys(this.hours ?? {})
        }
      }
    }
  }
})
</script>