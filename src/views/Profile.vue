<template>
  <v-container v-if="user" fluid grid-list-md>
    <p class="subheading grey--text">Profile</p>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md2>
        <v-card>
          <v-img :src="randomUserImg" height="300px">
            <v-layout column fill-height>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3" color="primary">
                  <v-icon>mdi-message</v-icon>
                </v-btn>
              </v-card-title>

              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-1 pt-5">{{ user.name }}</div>
              </v-card-title>
            </v-layout>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">mdi-briefcase</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ user.role }}</v-list-item-title>
                <v-list-item-subtitle>Role</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">mdi-star</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-subtitle>Top Skill</v-list-item-subtitle>
                <v-list-item-title>{{ getBestSkill.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">mdi-phone</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>083 555-1234</v-list-item-title>
                <v-list-item-subtitle>Number</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">mdi-mail</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ user.email }}</v-list-item-title>
                <v-list-item-subtitle>E-Mail</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-action>
                <v-icon color="primary">mdi-calendar</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{
                  moment(user.dateJoined).format('DD-MM-YYYY')
                }}</v-list-item-title>
                <v-list-item-subtitle>Joined</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md10>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-card>
                  <v-toolbar color="primary" dark dense flat>
                    <v-toolbar-title>Top Skills</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-arrow-expand</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-list>
                    <template v-for="(item, index) in user.skills">
                      <v-list-item
                        :key="item.name"
                        ripple
                        @click="toggle(index)"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text>{{
                            item.esteem
                          }}</v-list-item-action-text>
                          <v-icon
                            v-if="
                              selected.indexOf(index) < 0 &&
                                !user.skills[index].votedFor
                            "
                            color="grey lighten-1"
                          >
                            mdi-plus-one
                          </v-icon>

                          <v-icon v-else color="yellow darken-2">
                            mdi-plus-one
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                      <v-divider
                        v-if="index + 1 < sortedSkills.length"
                        :key="index"
                      ></v-divider>
                    </template>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex d-flex xs12>
                <SimilarUsers v-if="similarUsers.data" :users="similarUsers" />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex xs3>
            <v-card>
              <v-card-text>
                <DoughnutChart
                  v-if="loaded"
                  :chart-data="chartData"
                  :chart-labels="chartLabels"
                  :max="getBestSkill"
                  :height="227"
                />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DoughnutChart from '../charts/DoughnutChart';
import SimilarUsers from '../components/SimilarUsers';

export default {
  components: {
    DoughnutChart,
    SimilarUsers
  },
  data() {
    return {
      selected: [0],
      chartData: null,
      chartLabels: null,
      loaded: false,
      user: null,
      similarUsers: []
    };
  },
  computed: {
    sortedSkills() {
      return this.user.skills.concat().sort((a, b) => b.rating - a.rating);
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
  mounted() {
    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        this.similarUsers = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  created() {
    this.$store
      .dispatch('fetchUser', this.$route.params.id)
      .then(result => {
        this.user = result.data.data;
        this.chartLabels = this.user.skills.map(a => a.name);
        this.chartData = this.user.skills.map(a => a.rating);
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);

      if (i > -1) {
        this.user.skills[index].rating--;
        this.user.skills[index].votedFor = false;
        this.selected.splice(i, 1);
      } else {
        this.user.skills[index].rating++;
        this.user.skills[index].votedFor = true;
        this.selected.push(index);
      }
    }
  }
};
</script>
