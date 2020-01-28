<template>
  <div v-if="categories" id="chart">
    <apexcharts
      v-if="userSkills.length || user.skills.length"
      type="radar"
      :height="height"
      width="100%"
      :options="chartOptions"
      :series="chartSeries"
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
  props: {
    skillCategories: {
      type: Array,
      default: () => []
    },
    userSkills: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: () => 120
    },
    height: {
      type: Number,
      default: () => 300
    },
    width: {
      type: Number,
      default: () => 500
    }
  },
  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    ...mapState(['user']),
    chartSeries() {
      return [
        {
          name: 'Total Category Esteem',
          data: this.categoryTotals
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          background: this.isDark ? '#343a40' : '#ffffff'
        },
        stroke: {
          width: 0,
          curve: 'smooth'
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        fill: {
          opacity: 0.7,
          colors: [localStorage.getItem('accentColor')]
        },
        plotOptions: {
          radar: {
            size: this.size,
            polygons: {
              fill: {
                colors: this.isDark ? ['#343a40'] : ['#ffffff']
              }
            }
          }
        },
        yaxis: {
          labels: {
            formatter: val => val.toFixed(0)
          }
        },
        markers: {
          colors: [localStorage.getItem('accentColor')],
          size: 2.5
        },
        tooltip: {
          y: {
            formatter: val => val
          }
        },

        labels: this.categoryLabels
      };
    },
    categories() {
      let categories = this.skillCategories.map(e => {
        return { name: e.name, skills: [] };
      });

      const s = this.userSkills.length ? this.userSkills : this.user.skills;
      categories.forEach(category => {
        s.forEach(skill => {
          if (skill.categoryName === category.name) {
            category.skills.push(skill);
          }
        });
      });

      return categories.sort((a, b) => b.name - a.name);
    },
    categoryLabels() {
      return this.categories.map(el => el.name);
    },
    categoryTotals() {
      let l = this.categories.map(el =>
        el.skills.reduce((acc, curr) => acc + curr.esteem, 0)
      );

      return l;
    },

    bestSkill() {
      return [...this.categoryTotals].sort((a, b) => b - a).slice(0, 1);
    }
  }
};
</script>

<style></style>
