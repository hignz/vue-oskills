<template>
  <v-container v-if="loaded">
    <p class="subheading grey--text">Dashboard</p>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" outlined tile>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-row class="subtitle-2 ml-2"
                  >Hello, {{ user.name.split(' ')[0] }}</v-row
                >
                <v-row class="caption grey--text ml-2">{{ user.role }}</v-row>
              </v-col>
              <v-col v-for="i in 3" :key="i" cols="3">
                <v-row>
                  {{ sortedSkills[i].name }}
                </v-row>
                <v-row>
                  <v-icon
                    class="ml-4"
                    :color="
                      sortedSkills[i].esteem === 1
                        ? 'red'
                        : sortedSkills[i].esteem === 2
                        ? 'orange'
                        : 'green'
                    "
                  >
                    mdi-circle
                  </v-icon>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card class="pa-2" outlined tile>
          .col-12 .col-md-8
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="pa-2" outlined tile>
          <div id="chart">
            <apexcharts
              type="radialBar"
              height="350"
              :options="getChartOptions"
              :series="getChartSeries"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card :height="292">
          <SimilarUsers :users="similarUsers" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card :height="292">
          <SkillList :skills="sortedSkills"></SkillList>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card :height="292"> .col-6 .col-md-4 </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimilarUsers from '../components/SimilarUsers';
import SkillList from '../components/SkillList';
import VueApexCharts from 'vue-apexcharts';
import { mapGetters } from 'vuex';

export default {
  components: {
    SimilarUsers,
    SkillList,
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
    ...mapGetters(['sortedSkills']),
    getChartSeries() {
      return this.sortedSkills.map(e => {
        return e.rating;
      });
    },
    // TODO: make chart reactive
    getChartOptions() {
      return {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px',
                formatter: val => {
                  return val;
                }
              }
            }
          }
        },
        labels: this.sortedSkills.map(e => {
          return e.name;
        })
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
        this.similarUsers = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
