<template>
  <v-container fluid>
    <v-row v-if="loaded" justify="center" align="center">
      <v-col cols="12" sm="12">
        <ManageSkills
          :skills="unarchivedSkills"
          @archived="addToArchivedSkills"
        />
      </v-col>
      <v-col cols="12" sm="12">
        <ManageArchivedSkills
          :skills="archivedSkills"
          @unarchived="addToUnarchivedSkills"
        />
      </v-col>
      <v-col cols="12" sm="12">
        <ManageCategories :categories="allCategories" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ManageSkills from '../components/ManageSkills';
import ManageArchivedSkills from '../components/ManageArchivedSkills';
import ManageCategories from '../components/ManageCategories';
import { mapActions } from 'vuex';

export default {
  components: {
    ManageSkills,
    ManageCategories,
    ManageArchivedSkills
  },
  data() {
    return {
      allSkills: [],
      allCategories: [],
      loaded: false
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
    this.fetchAllSkills().then(res => {
      this.allSkills = res.skills;
      this.loaded = true;
    });

    this.fetchCategories().then(res => {
      this.allCategories = res.categories;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchAllSkills', 'fetchCategories']),
    addToUnarchivedSkills(skill) {
      skill.archived = false;
    },
    addToArchivedSkills(skill) {
      skill.archived = true;
    }
  }
};
</script>

<style></style>
