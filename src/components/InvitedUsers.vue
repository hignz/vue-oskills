<template>
  <v-card flat>
    <v-card-title
      >Invited
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
        item-key="email"
        no-data-text="No users loaded"
        no-results-text="No users found"
        :items-per-page="10"
      >
        <template v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete user</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon small @click="openUserProfile(item._id)">
                  mdi-account-card-details
                </v-icon>
              </v-btn>
            </template>
            <span>User profile</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

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
      singleExpand: false,
      headers: [
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Role',
          align: 'center',
          sortable: true,
          value: 'role'
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
    ...mapActions(['toggleSnackbar']),
    openUserProfile(userId) {
      this.$router.push({
        name: 'profile',
        params: { id: userId }
      });
    }
  }
};
</script>

<style></style>
