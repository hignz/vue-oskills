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

  computed: {
    ...mapGetters(['skills', 'isDark', 'accentColor']),
    ...mapState(['user']),
    chartSeries() {
      return this.series;
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          background: this.isDark ? '#282c34' : '#ffffff',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          animations: {
            enabled: false
          }
        },
        stroke: {
          width: 0
        },
        fill: {
          opacity: 0.4
        },
        markers: {
          size: 0
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
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
        labels: this.categoryLabels
      };
    },
    categoryLabels() {
      return this.skillCategories.map(el => el.name);
    },
    series() {
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
  created() {
    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });
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
