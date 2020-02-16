<template>
  <div id="chart">
    <apexchart
      type="heatmap"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
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
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'heatmap',
          background: '#282c34'
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            polygons: {
              fill: {
                colors: ['#282c34']
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        theme: {
          mode: 'dark'
        },
        colors: [localStorage.getItem('accentColor')],
        title: {
          text: 'HeatMap'
        }
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
      for (let index = 0; index < 26; index += 5) {
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
