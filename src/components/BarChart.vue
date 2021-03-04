<script>
import { Bar } from './BaseChart'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Chart',
  extends: Bar,
  props: {
    hours: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: Object.keys(this.hours),
        datasets: [
          {
            label: '# of Messages',
            backgroundColor: '#34B7F1',
            data: Object.values(this.hours)
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  }
})
</script>