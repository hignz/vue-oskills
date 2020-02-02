<template>
  <v-card>
    <v-card-title
      >Categories
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
      :items="categories"
      :items-per-page="10"
      :search="search"
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
      categories: null,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        }
      ]
    };
  },
  created() {
    this.fetchCategories().then(res => {
      this.categories = res.categories;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchCategories'])
  }
};
</script>

<style></style>
