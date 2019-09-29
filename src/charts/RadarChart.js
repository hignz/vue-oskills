import { Radar } from 'vue-chartjs';

export default {
  extends: Radar,
  props: ['chartData', 'chartLabels'],
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          display: false
        },

        maintainAspectRatio: false,
        scale: {
          ticks: {
            min: 0
          }
        }
      }
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Skills',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#rgba(115, 92, 221, 1)',
            backgroundColor: [
              'rgba(9, 188, 138, 0.7)',
              'rgba(238, 20, 52, 0.7)',
              'rgba(10, 132, 200, 0.7)',
              'rgba(115, 92, 221, 0.7)',
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.1)'
            ],
            borderColor: [
              'rgba(9, 188, 138, 1)',
              'rgba(238, 20, 52, 1)',
              'rgba(10, 132, 200, 1)',
              'rgba(115, 92, 221, 1)',
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.1)'
            ],
            data: this.chartData
          }
        ]
      },
      this.options
    );
  }
};
