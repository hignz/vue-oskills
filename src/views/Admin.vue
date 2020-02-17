<template>
  <v-container v-if="loaded" fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Hello, admin
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Users</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.userCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <InviteUserDialog />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Skills</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.skillCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AdminAddSkillDialog @skillAdded="incrementSkillCount" />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Categories</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.categoryCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AdminAddCategoryDialog @categoryAdded="incrementCategoryCount" />
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="2">
        <v-card class="justi">
          <v-card-subtitle class="title">Roles</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.roleCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AddRoleDialog @roleAdded="incrementRoleCount" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text"
              >Top skills</v-toolbar-title
            >
          </v-toolbar>
          <TopSkills />
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
             <AdminInvitedUsers
              :users="users"
              @invited="invited"
            ></AdminInvitedUsers>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Recently Invited
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <Heatmap :categories="categories" :skills="userSkills" />
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 3 Col 2
          </v-card-text>
        </v-card>
      </v-col> -->
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <ActivityFeed
            v-if="recentActivity.length"
            :activity-data="recentActivity"
            :is-real-time="true"
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
import { mapActions } from 'vuex';
import AdminInvitedUsers from '../components/AdminInvitedUsers';

const ActivityFeed = () => import('../components/ActivityFeed');

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
      stats: {},
      users: [],
      recentActivity: [],
      stats: {},
      categories: [],
      userSkills: []
    };
  },
  computed: {
    invitedUsers() {
      return this.allUsers.filter(el => !el.isVerified);
    }
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
      this.loaded = true;
    });
    
    this.fetchInvitedUsersSlim('3')
      .then(response => {
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
      'fetchInvitedUsersSlim'
      'fetchCategories',
      'fetchAllUserSkills'
    ]),
    incrementSkillCount(value) {
      this.stats.skillCount += value;
    },
    invited(item) {
      this.allUsers = this.allUsers.filter(el => el._id !== item);
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
