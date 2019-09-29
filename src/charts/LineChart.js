import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartData', 'chartLabels'],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        fill: false,
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 25
              }
            }
          ]
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
            label: 'C#',

            fill: false,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: [
              'rgba(9, 188, 138, 1)',
              'rgba(115, 92, 221 , 1)',
              'rgba(238, 132, 52, 1)',
              'rgba(115, 92, 221, 1)',
              'rgba(0, 0, 0, 0.1)',
              'rgba(0, 0, 0, 0.1)'
            ],
            borderColor: [
              'rgba(9, 188, 138, 1)',
              'rgba(115, 92, 221 , 1)',
              'rgba(238, 132, 52, 1)',
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
