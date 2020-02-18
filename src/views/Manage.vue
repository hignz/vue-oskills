<template>
  <v-container fluid>
    <v-card outlined>
      <v-tabs v-model="tab" @change="load">
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
        <v-tab href="#3">
          Roles
        </v-tab>

        <v-tabs-items v-model="tab">
          <v-card-text>
            <v-tab-item
              value="0"
              :transition="false"
              :reverse-transition="false"
            >
              <v-row v-if="loaded" justify="center" align="center">
                <v-col cols="12" sm="12">
                  <ManageUsers
                    :users="verifiedUsers"
                    @userDeleted="deleteUser"
                  />
                  <v-divider></v-divider>
                  <v-col cols="12" sm="12">
                    <InvitedUsers :users="invitedUsers" @invite="editInvite" />
                  </v-col>
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item
              value="1"
              :transition="false"
              :reverse-transition="false"
            >
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

            <v-tab-item
              value="2"
              :transition="false"
              :reverse-transition="false"
            >
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
            <v-tab-item
              value="3"
              :transition="false"
              :reverse-transition="false"
            >
              <v-row v-if="loaded" justify="center" align="center">
                <v-col cols="12" sm="12">
                  <ManageRoles :roles="allRoles" @roleAdded="updateRoles" />
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-card-text>
        </v-tabs-items>
      </v-tabs>
    </v-card>
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
import ManageRoles from '../components/ManageRoles';

export default {
  components: {
    ManageSkills,
    ManageCategories,
    ManageArchivedSkills,
    ArchivedCategories,
    ManageUsers,
    InvitedUsers,
    ManageRoles
  },
  data() {
    return {
      allSkills: [],
      allCategories: [],
      allUsers: [],
      allRoles: [],
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
    ...mapActions([
      'fetchAllSkills',
      'fetchCategories',
      'fetchAllUsers',
      'fetchAllRoles'
    ]),
    fetchUsers() {
      this.fetchAllUsers().then(res => {
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
    fetchRoles() {
      this.fetchAllRoles().then(res => {
        this.allRoles = res.roles;
        this.loaded = true;
      });
    },
    unarchive(item) {
      item.archived = false;
    },
    archive(item) {
      item.archived = true;
    },
    load(tab) {
      if (tab === '0') {
        this.fetchUsers();
      } else if (tab === '1') {
        this.fetchSkills();
      } else if (tab === '2') {
        this.fetchAllCategories();
      } else {
        this.fetchRoles();
      }
    },
    deleteUser(item) {
      this.allUsers = this.allUsers.filter(el => el._id !== item);
    },
    editInvite(item) {
      this.allUsers = this.allUsers.filter(el => el._id !== item);
    },
    updateRoles(item) {
      this.allRoles.push(item);
    }
  }
};
</script>

<style></style>
