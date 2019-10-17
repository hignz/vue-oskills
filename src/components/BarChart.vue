<template>
  <div id="chart">
    <apexcharts
      type="bar"
      height="300"
      :options="barChartOptions"
      :series="barChartSeries"
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
  // props: {
  //   userSkills: {
  //     type: Object,
  //     required: true
  //   }
  // },
  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    barChartSeries() {
      return [
        {
          name: 'Esteem Points',
          data: this.skills.map(e => {
            return e.rating;
          })
        }
      ];
    },
    barChartOptions() {
      return {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '10%'
          }
        },
        dataLabels: {
          enabled: true
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        chart: {
          background: this.isDark ? '#424242' : '#ffffff',
          foreColor: this.isDark ? '#ffffff' : '#424242'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: 'Esteem Points'
          },
          categories: this.skills.map(el => {
            return el.name;
          })
        },
        // yaxis: {
        //   max: this.getBestSkill.rating + 10
        // },
        fill: {
          opacity: 0.6,
          colors: [this.accentColor]
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      };
    }
  }
};
</script>

<style></style>
