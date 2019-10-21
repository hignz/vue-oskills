<template>
  <v-container v-if="loaded">
    <v-row>
      <v-col cols="12" sm="12">
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col sm="12" md="3">
                <v-row class="subtitle-2 ml-12"
                  >Hello, {{ user.name.split(' ')[0] }}</v-row
                >
                <v-row class="caption grey--text ml-12">{{ user.role }}</v-row>
                <v-row class="caption grey--text ml-12"
                  >Remaining Votes: {{ user.remainingVotes }}</v-row
                >
              </v-col>
              <v-col
                v-for="(skill, i) in topThreeSkills"
                :key="i"
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
                      <EsteemBadge :skill="skill"></EsteemBadge>
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
        <BarChart :skills="skills"></BarChart>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart></RadarChart>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <SimilarUsers :users="similarUsers" />
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <SkillList :skills="topThreeSkills"></SkillList>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <ActivityFeed></ActivityFeed>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import SimilarUsers from '../components/SimilarUsers';
import SkillList from '../components/SkillList';
import ActivityFeed from '../components/ActivityFeed';
import EsteemBadge from '../components/EsteemBadge';
import BarChart from '../components/BarChart';
import RadarChart from '../components/RadarChart';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    SimilarUsers,
    SkillList,
    BarChart,
    RadarChart
  },
  data() {
    return {
      user: {},
      similarUsers: [],
      loaded: false,
      now: new Date().toLocaleDateString()
    };
  },
  computed: {
    ...mapGetters(['topThreeSkills', 'skills']),
    randomUserImg() {
      return `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * (Math.floor(65) - Math.ceil(1) + 1)
      ) + 1}.jpg`;
    }
  },
  created() {
    this.$store
      .dispatch('fetchUser')
      .then(response => {
        this.user = response;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => (this.loaded = true));

    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        this.similarUsers = response.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
