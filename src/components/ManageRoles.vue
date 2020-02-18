<template>
  <div>
    <v-card-title
      >All
      <span class="caption ml-2 grey--text">({{ roles.length }})</span>
      <v-spacer></v-spacer>
      <AddRoleDialog @roleAdded="emitRoleAdded" />
      <v-form>
        <v-text-field
          v-model="search"
          class="mb-5 mx-5"
          append-icon="mdi-magnify"
          label="Search roles..."
          single-line
          clearable
          hide-details
        ></v-text-field>
      </v-form>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="roles"
      :items-per-page="10"
      :search="search"
      no-data-text="No roles loaded"
      no-results-text="No roles found"
      sort-by="voteWeight"
      sort-desc
      multi-sort
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddRoleDialog from './AddRoleDialog';

export default {
  components: {
    AddRoleDialog
  },
  props: {
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
      loaded: false,
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        { text: 'Vote weight', value: 'voteWeight', align: 'center' },
        { text: 'Vote count', value: 'voteCount', align: 'center' }
        // { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    };
  },
  methods: {
    ...mapActions(['toggleSnackbar']),
    emitRoleAdded(item) {
      this.$emit('roleAdded', item);
    }
  }
};
</script>

<style></style>
