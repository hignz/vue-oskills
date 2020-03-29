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
            horizontal:
              this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
                ? false
                : true,
            barHeight: '50%',
            dataLabels: {
              position: 'top',
              maxItems: 100,
              orientation: 'horizontal'
            }
          }
        },
        dataLabels: {
          enabled: true
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        chart: {
          id: 'barChart',
          background: this.isDark ? '#282c34' : '#fafafa',
          foreColor: this.isDark ? '#eeeeef' : '#5e5e5e'
        },
        xaxis: {
          categories: this.categories,
          tickAmount: this.tickCount
        },
        yaxis: {
          tickAmount: this.tickCount,
          labels: {
            formatter: function(val) {
              return val;
            }
          }
        },
        colors: [localStorage.getItem('accentColor')],

        fill: {
          opacity: 0.7,
          colors: [localStorage.getItem('accentColor')]
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          },
          shared: true,
          intersect: false
        }
      };
    },
    maxSkill() {
      return this.user.skills.reduce(
        (acc, curr) => (acc.rating > curr.rating ? acc : curr),
        0
      );
    },
    tickCount() {
      return this.maxSkill.rating < 10
        ? this.maxSkill.rating
        : this.maxSkill.rating / 10 < 1
        ? Math.ceil(this.maxSkill.rating / 10)
        : this.maxSkill.rating / 10;
    }
  }
};
</script>

<style>
.apexcharts-toolbar {
  z-index: 0;
}
</style>
