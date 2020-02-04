<template>
  <v-card>
    <v-card-title
      >Manage categories
      <v-spacer></v-spacer>
      <v-form>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          clearable
          hide-details
        ></v-text-field>
      </v-form>
    </v-card-title>
    <v-data-table
      v-if="loaded"
      :headers="headers"
      :items="categories"
      :search="search"
      no-data-text="No categories loaded"
      no-results-text="No categories found"
      class="elevation-1"
    >
    </v-data-table>
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
