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
import { mapGetters, mapState } from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexcharts: VueApexCharts
  },
  computed: {
    ...mapGetters(['isDark', 'accentColor']),
    ...mapState(['user']),
    sortedSkills() {
      return [...this.user.skills].sort((a, b) => b.rating - a.rating);
    },
    categories() {
      return this.sortedSkills.map(el => el.skill.name);
    },
    barChartSeries() {
      return [
        {
          name: 'Esteem Points',
          data: this.sortedSkills.map(e => {
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
            barHeight: '60%'
          }
        },
        dataLabels: {
          enabled: false
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        chart: {
          background: this.isDark ? '#282c34' : '#fafafa',
          foreColor: this.isDark ? '#eeeeef' : '#5e5e5e'
        },
        xaxis: {
          categories: this.categories
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              return Math.floor(val);
            }
          }
        },
        colors: [localStorage.getItem('accentColor')],

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
