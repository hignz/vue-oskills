<template>
  <v-card>
    <v-card-title
      >Manage categories
      <v-spacer></v-spacer>
      <EditCategoryDialog></EditCategoryDialog>
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
import EditCategoryDialog from '../components/EditCategoryDialog';

export default {
  components: {
    EditCategoryDialog
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
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
  created() {},
  methods: {}
};
</script>

<style></style>
