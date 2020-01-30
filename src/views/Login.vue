<template>
  <v-container fill-height fluid>
    <v-row justify="center" class="mb-24 ml-0">
      <v-col class="text-center" cols="12" sm="12" md="6" lg="3">
        <Login />
      </v-col>
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
