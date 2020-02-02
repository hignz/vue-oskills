<template>
  <v-card>
    <v-card-title
      >Skills
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-if="loaded"
      :headers="headers"
      :items="skills"
      :items-per-page="10"
      :search="search"
      multi-sort
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      search: '',
      loaded: false,
      skills: null,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Category', value: 'categoryName' }
      ]
    };
  },
  created() {
    this.fetchAllSkills().then(res => {
      this.skills = res.skills;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchAllSkills'])
  }
};
</script>

<style></style>
