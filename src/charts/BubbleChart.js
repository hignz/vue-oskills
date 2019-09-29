import { Bubble } from 'vue-chartjs';

export default {
  extends: Bubble,
  props: ['chartData', 'chartLabels'],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
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
            label: 'Skills',
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
