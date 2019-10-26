<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title class="subtitle-2 grey--text">SKILLS</v-toolbar-title>
    </v-toolbar>

    <div id="chart">
      <apexcharts
        type="bar"
        height="300"
        :options="barChartOptions"
        :series="barChartSeries"
      />
    </div>
  </v-card>
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
    bestSkill() {
      return this.skills.reduce((prev, current) =>
        prev.rating > current.rating ? prev : current
      );
    },

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
            horizontal: true,
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
          ticks: 10,

          title: {
            text: 'Esteem Points'
          },
          categories: this.skills.map(el => {
            return el.name;
          })
        },
        yaxis: {
          ticks: 10,
          min: 0,
          max: this.bestSkill.rating + 10
        },
        fill: {
          opacity: 0.6,
          colors: [localStorage.getItem('accentColor')]
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
