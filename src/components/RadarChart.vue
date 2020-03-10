<template>
  <div id="chart">
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
    },
    hideLoggedInUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      skillCategories: [],
      max: null
    };
  },
  computed: {
    ...mapGetters(['isDark', 'accentColor']),
    ...mapState(['user']),
    chartSeries() {
      return this.series;
    },
    chartOptions() {
      return {
        chart: {
          type: 'radar',
          id: 'radarChart',
          background: this.isDark ? '#282c34' : '#fafafa',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          animations: {
            enabled: true
          }
        },
        stroke: {
          width: 0
        },
        colors: [localStorage.getItem('accentColor'), '#BD93F9'],
        fill: {
          opacity: 0.5
        },
        markers: {
          size: 3,
          stroke: 0,
          hover: {
            size: 9
          }
        },
        yaxis: {
          tickAmount: this.maxSkill < 1 ? 1 : this.maxSkill / 10,
          labels: {
            formatter: function(val) {
              return val < 0 ? 0 : Math.floor(val);
            }
          },
          min: -1,
          max: this.maxSkill === 0 ? 1 : this.maxSkill
        },
        theme: {
          mode: this.isDark ? 'dark' : 'light'
        },
        plotOptions: {
          radar: {
            size: this.size,
            polygons: {
              fill: {
                colors: this.isDark ? ['#282c34'] : ['#fafafa']
              }
            }
          }
        },
        labels: this.categoryLabels
      };
    },
    yy() {
      return {
        tickAmount: this.maxSkill < 1 ? 1 : this.maxSkill / 10,
        labels: {
          formatter: function(val) {
            return val < 0 ? 0 : Math.floor(val);
          }
        },
        min: -1,
        max: this.maxSkill <= 1 ? 1 : this.maxSkill
      };
    },
    categoryLabels() {
      return this.skillCategories.map(el => el.name);
    },
    series() {
      const series = this.hideLoggedInUser
        ? [{ name: 'User', data: this.categories(this.userSkills) }]
        : this.userSkills.length
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
    },
    maxSkill() {
      console.log('jhasjh');

      return this.series
        .map(el => el.data)
        .flat()
        .reduce((acc, curr) => (acc > curr ? acc : curr), 0);
    }
  },
  watch: {},
  created() {
    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;

      this.max = this.getMaxSkill();

      console.log(this.max < 1 ? 1 : this.max);
    });
  },
  methods: {
    ...mapActions(['fetchCategoriesArchived']),
    getMaxSkill() {
      return this.series
        .map(el => el.data)
        .flat()
        .reduce((acc, curr) => (acc > curr ? acc : curr), 0);
    },
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
