<template>
  <v-card flat>
    <v-card-title
      >Users
      <v-spacer></v-spacer>
      <v-form>
        <v-text-field
          v-model="searchTerm"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          clearable
          hide-details
        ></v-text-field>
      </v-form>
    </v-card-title>

    <template>
      <v-data-table
        :headers="headers"
        :items="users"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        no-data-text="No users loaded"
        no-results-text="No users found"
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </template>
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length">Under construction</td>
        </template>
      </v-data-table>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { lightFormat } from 'date-fns';

export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchTerm: '',
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Role',
          align: 'center',
          sortable: true,
          value: 'role'
        },
        {
          text: 'Date Joined',
          align: 'center',
          sortable: true,
          value: 'dateJoined'
        },
        {
          text: 'Actions',
          value: 'action',
          sortable: false,
          align: 'center'
        }
      ],
      selectedUser: {}
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar'])
  }
};
</script>

<style></style>
