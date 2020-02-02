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
import { mapGetters, mapState } from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexcharts: VueApexCharts
  },
  computed: {
    ...mapGetters(['isDark', 'accentColor']),
    ...mapState(['user']),
    bestSkill() {
      return this.user.skills.reduce(
        (prev, current) => (prev.rating > current.rating ? prev : current),
        0
      );
    },

    barChartSeries() {
      return [
        {
          name: 'Esteem level',
          data: this.user.skills.map(e => {
            return e.rating;
          })
        }
      ];
    },
    barChartOptions() {
      return {
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        chart: {
          background: this.isDark ? '#282c34' : '#ffffff',
          foreColor: this.isDark ? '#ffffff' : '#424242'
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: 'Esteem Points'
          },
          categories: this.user.skills.map(el => {
            return el.name;
          })
        },
        yaxis: {},
        fill: {
          opacity: 0.7,
          colors: [localStorage.getItem('accentColor')]
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return Math.ceil(val / 5);
            }
          }
        }
      };
    }
  }
};
</script>

<style>
.apexcharts-toolbar {
  z-index: 0;
}
</style>
