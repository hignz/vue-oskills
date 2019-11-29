<template>
  <v-container v-if="loaded">
    <v-card>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="3" class="text-center">
          <v-row
            class="subtitle-2 ml-md-12"
            align="center"
            justify="center"
            justify-md="start"
            >Hello, {{ user.name.split(' ')[0] }}</v-row
          >
          <v-row
            class="caption grey--text ml-md-12 font-weight-bold"
            justify="center"
            justify-md="start"
            >{{ user.role }}</v-row
          >
          <v-row
            class="caption grey--text ml-md-12 font-weight-bold"
            justify="center"
            justify-md="start"
            >Remaining votes:
            <span class="font-weight-bold ml-1">
              {{ user.remainingVotes }}</span
            >
          </v-row>
        </v-col>
        <v-col
          v-for="(skill, i) in topThreeSkills"
          :key="i"
          sm="12"
          md="3"
          cols="12"
          class="text-center"
        >
          <v-row v-if="skill" align="center" justify="center">
            <v-col sm="6" class="text-center">
              <v-row class="caption grey--text" justify="center">
                {{ skill.name }}
              </v-row>
              <v-row class="headline" justify="center">{{
                skill.rating
              }}</v-row>
            </v-col>
            <v-col class="text-center">
              <v-row justify="start">
                <EsteemBadge :esteem="skill.esteem" />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-row else></v-row>
      </v-row>
    </v-card>

    <v-row>
      <v-col v-if="skills.length" cols="12" md="8" sm="12">
        <BarChart :skills="skills" class="pr-2"></BarChart>
      </v-col>
      <v-col v-if="skills.length" cols="12" md="4" sm="12">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart
            :skill-categories="skillCategories"
            :user-skills="skills"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >{{ usersCardTitle }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in usersMenuItems"
                  :key="i"
                  @click="switchUsersList(item, i)"
                >
                  <v-list-item-title class="subtitle-2">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <RecentUsers v-if="usersMenuIndex === 0" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <SkillList
          :skills="topThreeSkills"
          :skill-categories="skillCategories"
        ></SkillList>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <ActivityFeed></ActivityFeed>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import RecentUsers from '../components/RecentUsers';
import SkillList from '../components/SkillList';
import ActivityFeed from '../components/ActivityFeed';
import EsteemBadge from '../components/EsteemBadge';
import BarChart from '../components/BarChart';
import RadarChart from '../components/RadarChart';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RecentUsers,
    SkillList,
    BarChart,
    RadarChart
  },
  data() {
    return {
      user: {},
      loaded: false,
      now: new Date().toLocaleDateString(),
      usersMenuItems: [
        { title: 'Recently Joined' },
        { title: 'Similar Users' }
      ],
      usersMenuIndex: 0,
      usersCardTitle: 'Recently Joined',
      skillCategories: []
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
      .dispatch('fetchCategories')
      .then(res => {
        this.skillCategories = res.data.categories;
      })
      .catch(err => console.log(err));
  },
  methods: {
    switchUsersList(menuItem, i) {
      this.usersCardTitle = menuItem.title;
      this.usersMenuIndex = i;
    }
  }
};
</script>
