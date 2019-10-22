<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <Login />
    </v-layout>
  </v-container>
</template>

<script>
import Login from '../components/Login';

export default {
  components: {
    Login
  },
  created() {
    this.$store.dispatch('updateLoading', false);
  }
};
</script>

<style></style>
