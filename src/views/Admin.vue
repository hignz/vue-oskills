<template>
  <v-container fluid>
    <v-row class="text-center" align="stretch" justify="space-around">
      <v-col cols="12" sm="12" md="4">
        <v-card>Hello, admin</v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Total users</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            54
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
            124
          </v-card-text>
          <v-card-actions class="justify-center pt-0">
            <AdminAddSkillDialog></AdminAddSkillDialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-card>
          <v-card-subtitle class="title">Total categories</v-card-subtitle>
          <v-card-text class="title font-weight-bold primary--text">
            5
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
          <v-card-text>
            Row 3 Col 1
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

const ActivityFeed = () => import('../components/ActivityFeed');

export default {
  components: {
    InviteUserDialog,
    AdminAddCategoryDialog,
    AdminAddSkillDialog,
    ActivityFeed
  },
  data() {
    return {
      recentActivityData: []
    };
  },
  created() {
    this.fetchRecentActivity().then(res => {
      this.recentActivityData = res;
    });
  },
  methods: {
    ...mapActions(['fetchRecentActivity'])
  }
};
</script>

<style></style>
