<template>
  <div id="chart">
    <apexchart
      type="heatmap"
      height="286"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    skills: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isDark']),
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'heatmap',
          background: this.isDark ? '#282c34' : '#fafafa'
        },
        plotOptions: {
          heatmap: {
            enableShades: false,
            distributed: true,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 1,
                  color: this.isDark ? '#282c34' : '#fafafa',
                  name: 'low'
                },
                {
                  from: 1,
                  to: 5,
                  color: '#D4FBEB',
                  name: 'med'
                },
                {
                  from: 6,
                  to: 10,
                  color: '#9FF1D4',
                  name: 'high'
                },
                {
                  from: 10,
                  to: 20,
                  color: '#6EE3BF',
                  name: 'high'
                },
                {
                  from: 21,
                  to: 30,
                  color: '#41D1AB',
                  name: 'higher'
                },
                {
                  from: 31,
                  to: 45,
                  color: '#3695B6',
                  name: 'highest'
                }
              ]
            }
          }
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        colors: [localStorage.getItem('accentColor')]
      };
    },
    series() {
      let categories = this.categories.map(el => ({
        name: el.name,
        skills: this.skills
          .filter(elm => elm.skill.category.name === el.name)
          .map(e => e.esteem)
      }));

      const series = categories.map(c => {
        return {
          name: c.name,
          data: this.genData(c.skills)
        };
      });

      return series;
    }
  },
  methods: {
    genData(skills) {
      const data = [];

      let iteration = 0;
      for (let index = 0; index < 40; index += 5) {
        data.push({
          x: `${index}-${index + 4}`,
          y: 0
        });

        for (let i = 0; i < skills.length; i++) {
          const esteem = skills[i];
          const min = data[iteration].x.split('-')[0];
          const max = data[iteration].x.split('-')[1];

          if (esteem >= min && esteem <= max) {
            data[iteration].y += 1;
          }
        }

        iteration += 1;
      }

      return data;
    }
  }
};
</script>

<style></style>
