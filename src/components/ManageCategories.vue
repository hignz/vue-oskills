<template>
  <v-card>
    <v-card-title
      >Manage categories
      <v-spacer></v-spacer>
      <EditCategoryDialog></EditCategoryDialog>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        clearable
        hide-details
      ></v-text-field>
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
      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon small @click="showEditDialog(item)">
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import EditCategoryDialog from '../components/EditCategoryDialog';

export default {
  components: {
    EditCategoryDialog
  },
  data() {
    return {
      search: '',
      loaded: false,
      categories: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          align: 'center'
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
