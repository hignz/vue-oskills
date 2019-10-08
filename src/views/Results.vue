<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <div v-if="results.data">
      <div v-if="results.data.length > 0">
        <v-card-title class="subtitle-1">Users</v-card-title>
        <v-row v-for="i in rowCount" :key="i" justify="end">
          <v-col
            v-for="(result, j) in results.data.slice(calcIndex(i))"
            :key="j"
          >
            <MiniProfile :user="results.data[j]"></MiniProfile>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="align-center">No results found</v-card>
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
      results: {}
    };
  },
  computed: {
    rowCount() {
      return Math.ceil(this.results.data.length / 5);
    }
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
  },
  methods: {
    calcIndex(i) {
      if (i - 1 === 0) return 0;
      return (i - 1) * 5;
    }
  }
};
</script>

<style></style>
