<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <Login />
    </v-row>
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
