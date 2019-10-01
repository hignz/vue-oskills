<template>
  <v-container grid-list-lg fluid class="page">
    <p class="subheading grey--text">Explore</p>
    <v-layout align-content-start justify-space-between row wrap>
      <v-flex v-for="user in users.data" :key="user._id" xs12 md6 mb-3>
        <MiniProfile v-if="loaded" :user="user" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MiniProfile from '../components/MiniProfile';

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
    this.$store
      .dispatch('getAllUsers')
      .then(response => {
        this.users = response.data;
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
