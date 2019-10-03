<template>
  <v-container>
    <p class="subheading grey--text">Results</p>
    <v-row v-if="results">
      <MiniProfile
        v-for="(result, i) in results.data"
        :key="i"
        :user="result"
      ></MiniProfile>
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
