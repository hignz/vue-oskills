<template>
  <v-container fluid>
    <p class="subheading grey--text">Explore</p>
    <v-row v-if="users.length" justify="center" align="center">
      <v-col
        v-for="(user, i) in users.slice(0, 4)"
        :key="i"
        cols="12"
        sm="12"
        md="3"
      >
        <MiniProfile :user="user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MiniProfile from '../components/MiniProfile';
import { mapActions } from 'vuex';

export default {
  components: {
    MiniProfile
  },
  data() {
    return {
      users: {},
      loaded: false
    };
  },
  created() {
    this.fetchRecentUsers()
      .then(response => {
        console.log(response.users);

        this.users = response.users;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(['fetchRecentUsers'])
  }
};
</script>

<style></style>
