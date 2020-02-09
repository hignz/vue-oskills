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
    barChartSeries() {
      return [
        {
          name: 'Esteem level',
          data: this.user.skills
            .map(e => {
              return e.rating;
            })
            .sort((a, b) => b - a)
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
          foreColor: this.isDark ? '#eeeeef' : '#5e5e5e'
        },
        xaxis: {
          title: {},
          categories: this.user.skills
            .map(el => {
              return el.skill.name;
            })
            .sort((a, b) => b - a)
        },
        yaxis: {},
        fill: {
          opacity: 0.5,
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

<style>
.apexcharts-toolbar {
  z-index: 0;
}
</style>
