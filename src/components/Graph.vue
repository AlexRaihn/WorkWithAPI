<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          backgroundColor: '#a6c7fe',
          data: [],
          label: 'Изменения курса валюты'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
  }),
  props: {
        sparkline: Array,
        timeIntervalerval: Array
    },
  mounted () {
    this.chartdata.datasets[0].data = this.sparkline;
    this.chartdata.labels = this.timeIntervalerval;
    this.renderChart(this.chartdata, this.options);
  }
}
</script>