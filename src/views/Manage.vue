<template>
  <v-container fluid>
    <v-tabs v-model="tab" @change="update">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Skills
      </v-tab>
      <v-tab href="#tab-2">
        Categories
      </v-tab>
      <v-tab href="#tab-3">
        Users
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item
          value="tab-1"
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
          value="tab-2"
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
          value="tab-3"
          :transition="false"
          :reverse-transition="false"
        >
          <v-row v-if="loaded" justify="center" align="center">
            <v-col cols="12" sm="12">
              <ManageUsers :users="allUsers" />
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import ManageSkills from '../components/ManageSkills';
import ManageArchivedSkills from '../components/ManageArchivedSkills';
import ManageCategories from '../components/ManageCategories';
import ArchivedCategories from '../components/ArchivedCategories';
import ManageUsers from '../components/ManageUsers';
import { mapActions } from 'vuex';

export default {
  components: {
    ManageSkills,
    ManageCategories,
    ManageArchivedSkills,
    ArchivedCategories,
    ManageUsers
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
    }
  },
  created() {
    this.fetchSkillsAndCategories();
    this.fetchUsers();
  },
  methods: {
    ...mapActions(['fetchAllSkills', 'fetchCategories', 'fetchAllUsers']),
    fetchSkillsAndCategories() {
      this.fetchAllSkills().then(res => {
        this.allSkills = res.skills;
        this.loaded = true;
      });

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
    update() {
      this.fetchSkillsAndCategories();
    },
    fetchUsers() {
      this.fetchAllUsers().then(res => {
        console.log(res);
        console.log(res.data);
        this.allUsers = res.data;
        this.loaded = true;
      });
    }
  }
};
</script>

<style></style>
