<template>
  <v-container v-if="loaded" fluid>
    <v-card class="mb-3">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="3" class="text-center">
          <v-row>
            <v-col sm="12" md="6">
              <v-row
                class="subtitle-2 ml-md-12"
                align="center"
                justify="center"
                justify-md="start"
                >Hello, {{ user.name.split(' ')[0] }}
                <v-icon v-if="user.isAdmin" class="ml-2 mb-1"
                  >mdi-account-tie</v-icon
                >
              </v-row>
              <v-row
                class="subtitle-2 ml-md-12"
                align="center"
                justify="center"
                justify-md="start"
              >
              </v-row>
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
          </v-row>
        </v-col>
        <v-col
          v-for="(s, i) in topThreeSkills"
          :key="i"
          sm="12"
          md="3"
          cols="12"
          class="text-center"
        >
          <v-row v-if="s.skill" align="center" justify="center">
            <v-col sm="6" class="text-center">
              <v-row class="caption grey--text" justify="end" justify-md="end">
                {{ s.skill.name }}
              </v-row>
              <v-row class="headline mr-md-2" justify="end" justify-md="end">{{
                s.rating
              }}</v-row>
            </v-col>
            <v-col sm="6" class="text-center">
              <v-row justify="start" class="mt-3">
                <EsteemBadge :esteem="s.esteem" />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions class="pt-0 ml-8">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon :to="{ path: 'admin' }" v-on="on">
              <v-icon large>
                mdi-swap-horizontal
              </v-icon>
            </v-btn>
          </template>
          <span>Admin</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>

    <v-row>
      <v-col v-if="user.skills.length" cols="12" md="8" sm="12">
        <BarChart :skills="user.skills" class="pr-2"></BarChart>
      </v-col>
      <v-col v-if="user.skills.length" cols="12" md="4" sm="12">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <RadarChart :skill-categories="skillCategories" />
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
        <v-card>
          <ActivityFeed
            v-if="recentActivityData.length"
            :activity-data="recentActivityData"
            :is-real-time="true"
          ></ActivityFeed>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

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
      loaded: false,
      usersMenuItems: [
        { title: 'Recently Joined' },
        { title: 'Similar Users' }
      ],
      usersMenuIndex: 0,
      usersCardTitle: 'Recently Joined',
      skillCategories: [],
      recentActivityData: []
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['topThreeSkills', 'skills'])
  },
  created() {
    this.fetchUser().then(() => {
      this.loaded = true;
    });

    this.fetchCategoriesArchived('false').then(res => {
      this.skillCategories = res.categories;
    });

    this.fetchRecentActivity().then(res => {
      this.recentActivityData = res;
    });
  },
  methods: {
    ...mapActions([
      'fetchCategoriesArchived',
      'fetchUser',
      'toggleSnackbar',
      'fetchRecentActivity'
    ]),
    switchUsersList(menuItem, i) {
      this.usersCardTitle = menuItem.title;
      this.usersMenuIndex = i;
    }
  }
};
</script>
