<template>
  <div id="chart">
    <apexcharts
      type="radar"
      height="300"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexcharts: VueApexCharts
  },
  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    chartSeries() {
      return [
        {
          name: 'Esteem Points',
          data: this.skills.map(e => {
            return e.rating;
          })
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          background: this.isDark ? '#424242' : '#ffffff'
        },
        title: {
          text: 'Categories'
        },
        stroke: {
          width: 0
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light',
          palette: 'palette1'
        },
        fill: {
          opacity: 0.6,
          colors: [this.accentColor]
        },
        plotOptions: {
          radar: {
            size: 120,
            polygons: {
              fill: {
                colors: this.isDark ? ['#424242'] : ['#ffffff']
              }
            }
          }
        },
        yaxis: {
          tickAmount: 5,
          max: 10,
          labels: {
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return '';
              }
            }
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        },

        labels: this.skills.map(e => {
          return e.name;
        })
      };
    }
  }
};
</script>

<style></style>
