<template>
  <div v-if="categories" id="chart">
    <apexcharts
      type="radar"
      :height="height"
      :width="width"
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
  props: {
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
  data() {
    return {
      skillCategories: []
    };
  },
  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    chartSeries() {
      return [
        {
          name: 'Esteem Total',
          data: this.categoryTotals
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          background: this.isDark ? '#424242' : '#ffffff'
        },
        stroke: {
          width: 0,
          curve: 'smooth'
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        fill: {
          opacity: 0.6,
          colors: [localStorage.getItem('accentColor')]
        },
        plotOptions: {
          radar: {
            size: this.size,
            polygons: {
              fill: {
                colors: this.isDark ? ['#424242'] : ['#ffffff']
              }
            }
          }
        },
        yaxis: {
          tickAmount: 1,
          max: this.bestSkill[0],
          min: 1,
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
        return { name: e, skills: [] };
      });

      const s = this.userSkills.length ? this.userSkills : this.skills;
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
  },
  created() {
    this.$store
      .dispatch('fetchCategories')
      .then(res => {
        this.skillCategories = res.data.categories.map(el => el.name);
      })
      .catch(err => console.log(err));
  }
};
</script>

<style></style>
