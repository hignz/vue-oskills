<template>
  <div>
    <v-row v-if="users.length" class="mt-0 pt-0" justify="start" align="center">
      <v-col
        v-for="user in users.slice(0, 6)"
        :key="user._id"
        cols="12"
        sm="12"
        md="4"
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
