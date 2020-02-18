<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col sm="6" class="text-center my-12">
        <v-toolbar-title class="text-uppercase">
          <span class="display-1 font-weight-bold primary--text">O</span>
          <span class="display-1 font-weight-light grey--text">Skills</span>
        </v-toolbar-title>
        <v-toolbar-title class="primary--text mt-4">Sign in</v-toolbar-title>
      </v-col>
    </v-row>
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
    this.$store.dispatch('setLoading', false);
  }
};
</script>

<style></style>
