<template>
  <v-container fluid>
    <v-card outlined :loading="isLoading" loader-height="2">
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
                    @admin="userPromoted"
                  />
                  <v-divider></v-divider>
                  <v-col cols="12" sm="12">
                    <ManageInvitedUsers
                      :users="invitedUsers"
                      @invite="editInvite"
                    />
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
                  <ManageSkills
                    :skills="unarchivedSkills"
                    @archive="archive"
                    @newSkill="updateSkills"
                  />
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
                    @categoryAdded="updateCategories"
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
import ManageInvitedUsers from '../components/ManageInvitedUsers';
import ManageRoles from '../components/ManageRoles';

export default {
  components: {
    ManageSkills,
    ManageCategories,
    ManageArchivedSkills,
    ArchivedCategories,
    ManageUsers,
    ManageInvitedUsers,
    ManageRoles
  },
  data() {
    return {
      allSkills: [],
      allCategories: [],
      allUsers: [],
      allRoles: [],
      loaded: false,
      tab: null,
      isLoading: false
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
      this.isLoading = true;

      this.fetchAllUsers().then(res => {
        this.allUsers = res.users;

        this.loaded = true;
        this.isLoading = false;
      });
    },
    fetchSkills() {
      this.isLoading = true;

      this.fetchAllSkills().then(res => {
        this.allSkills = res.skills;

        this.loaded = true;
        this.isLoading = false;
      });
    },
    fetchAllCategories() {
      this.isLoading = true;

      this.fetchCategories().then(res => {
        this.allCategories = res.categories;

        this.isLoading = false;
        this.loaded = true;
      });
    },
    fetchRoles() {
      this.isLoading = true;

      this.fetchAllRoles().then(res => {
        this.allRoles = res.roles;
        this.loaded = true;

        this.isLoading = false;
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
      this.allUsers.forEach(u => {
        if (u._id === item.userId) {
          u.email = item.email;
          u.role = item.role;
          u.isAdmin = item.isAdmin;
        }
      });
    },
    updateRoles(item) {
      this.allRoles.push(item);
    },
    updateSkills(item) {
      this.allSkills.push(item);
    },
    updateCategories(item) {
      this.allCategories.push(item);
    },
    userPromoted(item) {
      this.allUsers.forEach(u => {
        if (u._id === item.uId) {
          u.isAdmin = item.isAdmin;
        }
      });
    }
  }
};
</script>

<style></style>
