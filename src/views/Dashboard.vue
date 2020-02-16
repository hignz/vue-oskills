<template>
  <v-container v-if="user" fluid>
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
                >Hello, {{ firstName }}
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
                >{{ user.role.title }}</v-row
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
        <template v-if="topThreeSkills.length">
          <v-col v-for="(s, i) in topThreeSkills" :key="i" sm="3" md="3">
            <v-row justify="center" align="end" align-md="center">
              <v-col cols="12" sm="4" class="text-center">
                <p class="body-2 grey--text mb-0">
                  {{ s.skill.name }}
                </p>
                <p class="title mb-0">
                  {{ s.rating }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row justify="center" justify-md="start" class="mt-md-3">
                  <EsteemBadge :esteem="s.esteem" />
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </template>

        <template v-else>
          <v-col v-for="(s, i) in 3" :key="i" sm="3" md="3">
            <v-row justify="center" align="end" align-md="center">
              <v-col cols="12" sm="4" class="text-center">
                <p class="body-2 grey--text mb-0">
                  N/A
                </p>
                <p class="title mb-0">
                  N/A
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-row justify="center" justify-md="start" class="mt-md-3">
                  <EsteemBadge :placeholder="true" />
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </template>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card height="370" outlined="">
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >SKILLS</v-toolbar-title
            >
          </v-toolbar>

          <v-card-text>
            <BarChart
              v-if="user.skills.length"
              :skills="user.skills"
            ></BarChart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card height="370" outlined>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >CATEGORIES</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text v-if="user.skills.length">
            <RadarChart :skill-categories="skillCategories" />
          </v-card-text>
          <template v-else>
            <v-card-text class="mt-12">
              <p class="text-center grey--text">
                A sexy ass chart will go here once you add some skills.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <AddSkillDialog :is-icon="false"></AddSkillDialog>
              <v-spacer />
            </v-card-actions>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-card height="280">
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
          <SimilarUsers v-if="usersMenuIndex === 1" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card height="280">
          <MiniSkillList :skills="topThreeSkills" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card height="280">
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
import SimilarUsers from '../components/SimilarUsers';
import MiniSkillList from '../components/MiniSkillList';
import ActivityFeed from '../components/ActivityFeed';
import EsteemBadge from '../components/EsteemBadge';
import BarChart from '../components/BarChart';
import RadarChart from '../components/RadarChart';
import AddSkillDialog from '../components/AddSkillDialog';

export default {
  components: {
    ActivityFeed,
    EsteemBadge,
    RecentUsers,
    MiniSkillList,
    BarChart,
    RadarChart,
    SimilarUsers,
    AddSkillDialog
  },
  data() {
    return {
      user: null,
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
    ...mapGetters(['topThreeSkills', 'skills']),
    firstName() {
      return this.user.name.split(' ')[0];
    }
  },
  created() {
    this.fetchUser().then(res => {
      this.user = res.data;
    });
    this.fetchRecentActivity().then(res => {
      this.recentActivityData = res;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchRecentActivity']),
    switchUsersList(menuItem, i) {
      this.usersCardTitle = menuItem.title;
      this.usersMenuIndex = i;
    }
  }
};
</script>
