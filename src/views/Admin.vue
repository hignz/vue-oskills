<template>
  <v-container v-if="loaded" fluid>
    <v-row class="text-center" align="stretch" justify="space-around">
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Hello, admin
          </v-card-text>

          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon :to="{ path: 'dashboard' }" v-on="on">
                  <v-icon large>
                    mdi-swap-horizontal
                  </v-icon>
                </v-btn>
              </template>
              <span>Dashboard</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Total users</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.userCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <InviteUserDialog />
          </v-card-actions>
        </v-card>

        <!-- <v-card>
          <v-card-subtitle class="title">Most popular skill</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            Java
          </v-card-text>
          <v-card-actions class="justify-center pt-9"> </v-card-actions>
        </v-card> -->
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Total skills</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.skillCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AdminAddSkillDialog
              @skillAdded="incrementSkillCount"
            ></AdminAddSkillDialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Total categories</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            {{ stats.categoryCount }}
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AdminAddCategoryDialog></AdminAddCategoryDialog>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="2">
        <v-card class="justi">
          <v-card-subtitle class="title">Most popular category</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            Languages
          </v-card-text>
          <v-card-actions class="justify-center pt-9"> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="text-center" align="center" justify="space-around">
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-text>
            Row 2 Col 1
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 2 Col 2
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around">
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title class="subtitle-2 grey--text text-uppercase"
              >Invited users
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <AdminInvitedUsers
              :users="invitedUsers"
              @invited="invited"
            ></AdminInvitedUsers>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-text>
            Row 3 Col 2
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
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
import InviteUserDialog from '../components/InviteUserDialog';
import AdminAddCategoryDialog from '../components/AdminAddCategoryDialog';
import AdminAddSkillDialog from '../components/AdminAddSkillDialog';
import { mapActions } from 'vuex';
import AdminInvitedUsers from '../components/AdminInvitedUsers';

const ActivityFeed = () => import('../components/ActivityFeed');

export default {
  components: {
    InviteUserDialog,
    AdminAddCategoryDialog,
    AdminAddSkillDialog,
    ActivityFeed,
    AdminInvitedUsers
  },
  data() {
    return {
      loaded: false,
      recentActivityData: [],
      stats: {},
      allUsers: []
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
    });
    this.fetchRecentActivity().then(res => {
      this.recentActivityData = res;

      this.loaded = true;
    });
    this.fetchAllUsers().then(res => {
      this.allUsers = res.users;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions([
      'fetchRecentActivity',
      'fetchAdminDashboardData',
      'fetchAllUsers'
    ]),
    incrementSkillCount(value) {
      console.log(value);

      this.stats.skillCount += value;
    },
    invited(item) {
      this.allUsers = this.allUsers.filter(el => el._id !== item);
    }
  }
};
</script>

<style></style>
