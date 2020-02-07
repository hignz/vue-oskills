<template>
  <div v-if="categories" id="chart">
    <apexcharts
      v-if="userSkills.length || user.skills.length"
      type="radar"
      :height="height"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
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
  created() {
    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });
  },
  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    ...mapState(['user']),
    chartSeries() {
      return this.seris;
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          background: this.isDark ? '#282c34' : '#ffffff'
        },
        stroke: {
          show: true,
          width: 3,
          colors: [localStorage.getItem('accentColor'), '#DC3912'],
          dashArray: 0
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        fill: {
          opacity: 0.7,
          colors: [localStorage.getItem('accentColor'), '#DC3912']
        },
        plotOptions: {
          radar: {
            size: this.size,
            polygons: {
              fill: {
                colors: this.isDark ? ['#282c34'] : ['#ffffff']
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
          colors: [localStorage.getItem('accentColor'), '#DC3912'],
          size: 4
        },
        tooltip: {
          y: {
            formatter: val => val
          }
        },

        labels: this.categoryLabels
      };
    },

    categoryLabels() {
      return this.skillCategories.map(el => el.name);
    },
    seris() {
      const series = this.userSkills.length
        ? [
            {
              name: 'You',
              data: this.categories(this.user.skills)
            },
            {
              name: 'User',
              data: this.categories(this.userSkills)
            }
          ]
        : [{ name: 'You', data: this.categories(this.user.skills) }];

      return series;
    }
  },
  methods: {
    ...mapActions(['fetchCategoriesArchived']),
    categories(skills) {
      let categories = this.skillCategories
        .map(el => ({
          name: el.name,
          skills: skills.filter(elm => elm.skill.category.name === el.name)
        }))
        .sort((a, b) => b.name - a.name);

      return categories.map(el =>
        el.skills.reduce((acc, curr) => acc + curr.esteem, 0)
      );
    }
  }
};
</script>

<style></style>
