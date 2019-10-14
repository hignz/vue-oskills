<template>
  <v-container v-if="loaded">
    <p class="subheading grey--text">Dashboard</p>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col xs="12" sm="12" md="3">
                <v-row class="subtitle-2 ml-2"
                  >Hello, {{ user.name.split(' ')[0] }}</v-row
                >
                <v-row class="caption grey--text ml-2">{{ user.role }}</v-row>
                <v-row class="overline grey--text ml-2"
                  >Remaining Votes: {{ user.remainingVotes }}</v-row
                >
              </v-col>
              <v-col
                v-for="(skill, i) in topThreeSkills"
                :key="i"
                xs="12"
                sm="12"
                md="3"
              >
                <v-row align="center">
                  <v-col sm="3">
                    <v-row class="caption grey--text" justify="center">
                      {{ skill.name }}
                    </v-row>
                    <v-row class="headline" justify="center">{{
                      skill.rating
                    }}</v-row>
                  </v-col>
                  <v-col>
                    <v-row justify="start">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            x-large
                            class="mt-2"
                            :color="
                              skill.esteem === 1
                                ? 'red'
                                : skill.esteem === 2
                                ? 'orange'
                                : 'green'
                            "
                            v-on="on"
                          >
                            mdi-hexagon
                          </v-icon>
                        </template>
                        <span>{{ skill.esteem }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card>
          <div id="chart">
            <apexcharts
              type="bar"
              height="300"
              :options="barChartOptions"
              :series="barChartSeries"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <div id="chart">
            <apexcharts
              type="radar"
              height="300"
              :options="radialChartOptions"
              :series="radialChartSeries"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <SimilarUsers :users="similarUsers" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <SkillList :skills="topThreeSkills"></SkillList>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card><ActivityFeed></ActivityFeed></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimilarUsers from '../components/SimilarUsers';
import SkillList from '../components/SkillList';
import VueApexCharts from 'vue-apexcharts';
import { mapGetters } from 'vuex';
import ActivityFeed from '../components/ActivityFeed';

export default {
  components: {
    SimilarUsers,
    SkillList,
    ActivityFeed,
    apexcharts: VueApexCharts
  },
  data() {
    return {
      user: {},
      similarUsers: [],
      skills: [],
      loaded: false,
      now: new Date().toLocaleDateString()
    };
  },
  computed: {
    ...mapGetters(['topThreeSkills']),
    radialChartSeries() {
      return [
        {
          name: 'Rating',
          data: this.user.skills.map(e => {
            return e.rating;
          })
        }
      ];
    },
    // TODO: make chart reactive
    radialChartOptions() {
      return {
        chart: {
          type: 'radar',
          background: '#424242'
        },
        title: {
          text: 'Categories'
        },
        stroke: {
          width: 0
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        fill: {
          opacity: 0.6
        },
        plotOptions: {
          radar: {
            size: 120,
            polygons: {
              strokeColor: '#e9e9e9',
              fill: {
                colors: ['#424242', '#424242']
              }
            }
          }
        },

        yaxis: {
          tickAmount: 5,
          labels: {
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return '';
              }
            }
          }
        },
        markers: {
          size: 2,
          colors: ['#fff'],
          strokeWidth: 2
        },
        labels: this.user.skills.map(e => {
          return e.name;
        })
      };
    },
    barChartSeries() {
      return [
        {
          name: 'Rating',
          data: this.user.skills.map(e => {
            return e.rating;
          })
        }
      ];
    },
    // TODO: make chart reactive
    barChartOptions() {
      return {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            background: '#fff'
          }
        },
        dataLabels: {
          enabled: true
        },
        theme: {
          mode: 'dark',
          palette: 'palette1'
        },
        chart: {
          background: '#424242'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.user.skills.map(el => {
            return el.name;
          })
        },
        yaxis: {
          title: {
            text: 'Rating'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      };
    },
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    },
    getBestSkill() {
      return this.user.skills.reduce((prev, current) =>
        prev.rating > current.rating ? prev : current
      );
    },
    getLowestSkill() {
      return this.user.skills.reduce((prev, current) =>
        prev.rating > current.rating ? current : prev
      );
    }
  },
  created() {
    this.$store
      .dispatch('fetchUser')
      .then(response => {
        this.user = response;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        console.log(response.data.data);
        this.similarUsers = response.data.data.slice(0, 4);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
