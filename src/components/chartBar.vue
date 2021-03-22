<script>
import { Bar, mixins } from 'vue-chartjs'
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
export default {
  extends: Bar,
  plugins: [ChartDataLabels],
  mixins: [mixins],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
