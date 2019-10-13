<template>
  <v-container>
    <p class="subheading grey--text">Explore</p>
    <v-layout v-if="users.data">
      <v-row>
        <v-col
          v-for="(user, i) in users.data.slice(0, 4)"
          :key="i"
          sm="12"
          md="3"
        >
          <MiniProfile :user="user" />
        </v-col>
      </v-row>
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
