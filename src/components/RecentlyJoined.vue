<template>
  <div>
    <v-row>
      <v-col class="mb-0 pb-0">
        <span class="grey--text">
          <v-icon color="grey" class="pb-1">
            mdi-account
          </v-icon>
          Recently joined</span
        >
      </v-col>
    </v-row>
    <v-row
      v-if="users.length"
      class="mt-0 pt-0"
      justify="center"
      align="center"
    >
      <v-col
        v-for="(user, i) in users.slice(0, 4)"
        :key="user._id"
        cols="12"
        sm="12"
        md="3"
      >
        <MiniProfile :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import MiniProfile from '../components/MiniProfile';

export default {
  components: {
    MiniProfile
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchRecentUsers().then(response => {
      this.users = response.users;
      this.loaded = true;
    });
  },
  methods: {
    ...mapActions(['fetchRecentUsers'])
  }
};
</script>

<style></style>
