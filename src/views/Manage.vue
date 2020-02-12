<template>
  <v-container fluid>
    <v-tabs v-model="tab" @change="update">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#0">
        Users
      </v-tab>
      <v-tab href="#1">
        Skills
      </v-tab>
      <v-tab href="#2">
        Categories
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item value="0" :transition="false" :reverse-transition="false">
          <v-row v-if="loaded" justify="center" align="center">
            <v-col cols="12" sm="12">
              <ManageUsers :users="verifiedUsers" @userDeleted="deleteUser" />
              <v-divider></v-divider>
              <v-col cols="12" sm="12">
                <InvitedUsers :users="invitedUsers" />
              </v-col>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="1" :transition="false" :reverse-transition="false">
          <v-row v-if="loaded" justify="center" align="center">
            <v-col cols="12" sm="12">
              <ManageSkills :skills="unarchivedSkills" @archive="archive" />
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" sm="12">
              <ManageArchivedSkills
                :skills="archivedSkills"
                @unarchive="unarchive"
              />
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item value="2" :transition="false" :reverse-transition="false">
          <v-row v-if="loaded" justify="center" align="center">
            <v-col cols="12" sm="12">
              <ManageCategories
                :categories="unarchivedCategories"
                @archive="archive"
              />
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" sm="12">
              <ArchivedCategories
                :categories="archivedCategories"
                @unarchive="unarchive"
              />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import ManageSkills from '../components/ManageSkills';
import ManageArchivedSkills from '../components/ManageArchivedSkills';
import ManageCategories from '../components/ManageCategories';
import ArchivedCategories from '../components/ArchivedCategories';
import ManageUsers from '../components/ManageUsers';
import InvitedUsers from '../components/InvitedUsers';

export default {
  components: {
    ManageSkills,
    ManageCategories,
    ManageArchivedSkills,
    ArchivedCategories,
    ManageUsers,
    InvitedUsers
  },
  data() {
    return {
      allSkills: [],
      allCategories: [],
      allUsers: [],
      loaded: false,
      tab: null
    };
  },
  computed: {
    unarchivedSkills() {
      return this.allSkills.filter(el => !el.archived);
    },
    archivedSkills() {
      return this.allSkills.filter(el => el.archived);
    },
    unarchivedCategories() {
      return this.allCategories.filter(el => !el.archived);
    },
    archivedCategories() {
      return this.allCategories.filter(el => el.archived);
    },
    verifiedUsers() {
      return this.allUsers.filter(el => el.isVerified);
    },
    invitedUsers() {
      return this.allUsers.filter(el => !el.isVerified);
    }
  },
  methods: {
    ...mapActions(['fetchAllSkills', 'fetchCategories', 'fetchAllUsers']),
    fetchUsers() {
      this.fetchAllUsers().then(res => {
        console.log(res);
        this.allUsers = res.users;
        this.loaded = true;
      });
    },
    fetchSkills() {
      this.fetchAllSkills().then(res => {
        this.allSkills = res.skills;
        this.loaded = true;
      });
    },
    fetchAllCategories() {
      this.fetchCategories().then(res => {
        this.allCategories = res.categories;
        this.loaded = true;
      });
    },
    unarchive(item) {
      item.archived = false;
    },
    archive(item) {
      item.archived = true;
    },
    update(tab) {
      if (tab === '0') {
        this.fetchUsers();
      } else if (tab === '1') {
        this.fetchSkills();
      } else {
        this.fetchAllCategories();
      }
    },
    deleteUser(item) {
      this.allUsers = this.allUsers.filter(el => el._id !== item);
    }
  }
};
</script>

<style></style>
