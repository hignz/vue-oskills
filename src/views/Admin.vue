<template>
  <v-container v-if="loaded" fluid>
    <v-row v-if="stats" class="text-center">
      <v-col cols="12" sm="12" md="4">
        <v-card outlined height="100%">
          <v-card-text>
            <p>Hello, admin</p>
            <p>
              Unused votes this week:
              <span class="font-weight-bold primary--text">{{
                stats.totalRemainingVotes[0].total
              }}</span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card outlined>
          <v-card-subtitle class="title"
            ><span class="title font-weight-bold primary--text">
              {{ stats.userCount }}</span
            >
            Users
          </v-card-subtitle>
          <v-card-actions class="justify-center pt-0">
            <InviteUserDialog />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card outlined>
          <v-card-subtitle class="title"
            ><span class="title font-weight-bold primary--text">
              {{ stats.skillCount }}
            </span>
            Skills
          </v-card-subtitle>
          <v-card-actions class="justify-center pt-0">
            <AdminAddSkillDialog @skillAdded="incrementSkillCount" />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card outlined>
          <v-card-subtitle class="title"
            ><span class="title font-weight-bold primary--text">
              {{ stats.categoryCount }}
            </span>
            Categories
          </v-card-subtitle>
          <v-card-actions class="justify-center pt-0">
            <AdminAddCategoryDialog @categoryAdded="incrementCategoryCount" />
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="2">
        <v-card outlined>
          <v-card-subtitle class="title"
            ><span class="title font-weight-bold primary--text">
              {{ stats.roleCount }}
            </span>
            Roles
          </v-card-subtitle>
          <v-card-actions class="justify-center pt-0">
            <AddRoleDialog @roleAdded="incrementRoleCount" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card outlined>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Top skills</v-toolbar-title
            >
          </v-toolbar>
          <TopSkills />
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card outlined height="100%">
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Recently invited
            </v-toolbar-title>
          </v-toolbar>

          <AdminInvitedUsers
            :users="users"
            @invited="invited"
          ></AdminInvitedUsers>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card outlined>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Heatmap
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-0">
            <Heatmap :categories="categories" :skills="userSkills" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card outlined height="350">
          <v-toolbar flat dense>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Activity</v-toolbar-title
            >
          </v-toolbar>
          <ActivityFeed
            v-if="recentActivity.length"
            :activity-data="recentActivity"
            :is-real-time="true"
            :full-size="true"
          ></ActivityFeed>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InviteUserDialog from '../components/InviteUserDialog';
import AdminAddCategoryDialog from '../components/AdminAddCategoryDialog';
import AdminAddSkillDialog from '../components/AdminAddSkillDialog';
import AddRoleDialog from '../components/AddRoleDialog';
import TopSkills from '../components/TopSkills';
import Heatmap from '../components/HeatmapChart';
import AdminInvitedUsers from '../components/AdminInvitedUsers';
const ActivityFeed = () => import('../components/ActivityFeed');

import { mapActions } from 'vuex';

export default {
  components: {
    InviteUserDialog,
    AdminAddCategoryDialog,
    AdminAddSkillDialog,
    ActivityFeed,
    AdminInvitedUsers,
    AddRoleDialog,
    TopSkills,
    Heatmap
  },
  data() {
    return {
      loaded: false,
      stats: null,
      users: [],
      recentActivity: [],
      categories: [],
      userSkills: []
    };
  },
  created() {
    this.fetchAdminDashboardData().then(res => {
      this.stats = res;
      this.loaded = true;
    });

    this.fetchRecentActivity().then(res => {
      this.recentActivity = res;
    });

    this.fetchCategories().then(res => {
      this.categories = res.categories;
    });

    this.fetchInvitedUsersSlim('4').then(response => {
      this.users = response.users;
    });

    this.fetchAllUserSkills().then(res => {
      this.userSkills = res;
    });
  },
  methods: {
    ...mapActions([
      'fetchRecentActivity',
      'fetchAdminDashboardData',
      'fetchInvitedUsersSlim',
      'fetchCategories',
      'fetchAllUserSkills'
    ]),
    incrementSkillCount(value) {
      this.stats.skillCount += value;
    },
    invited(item) {
      this.users = this.users.filter(el => el._id !== item);
    },
    incrementRoleCount() {
      this.stats.roleCount += 1;
    },
    incrementCategoryCount() {
      this.stats.categoryCount += 1;
    }
  }
};
</script>

<style></style>
