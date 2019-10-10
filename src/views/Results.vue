<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <div v-if="results.length">
      <v-row v-for="i in rowCount" :key="i" justify="start">
        <v-col
          v-for="(result, j) in results.slice(calcIndex(i), j)"
          :key="j"
          sm="12"
          md="3"
        >
          <MiniProfile :user="results[j]"></MiniProfile>
        </v-col>
      </v-row>
    </div>
    <v-row v-else-if="!results.length" align="center" justify="center">
      <v-col cols="6">
        <v-card class="text-center">No results found</v-card>
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
      results: []
    };
  },
  computed: {
    rowCount() {
      return Math.ceil(this.results.length / 5);
    }
  },
  created() {
    const searchTerm = this.$route.query.search;

    this.$store
      .dispatch('fetchByName', searchTerm)
      .then(response => {
        console.log(response);
        this.results = response.data.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    calcIndex(i) {
      if (i - 1 === 0) return 0;
      return (i - 1) * 6;
    }
  }
};
</script>

<style></style>
