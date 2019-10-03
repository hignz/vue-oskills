<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <v-row v-for="(result, i) in results.data" :key="i" :user="result">
      <v-col sm12>
        <MiniProfile v-if="results" :user="result"></MiniProfile>
      </v-col>
    </v-row>
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
      results: null
    };
  },
  created() {
    const searchTerm = this.$route.query.search;

    this.$store
      .dispatch('fetchUsersByName', searchTerm)
      .then(response => {
        this.results = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style></style>
