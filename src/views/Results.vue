<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <v-card-title class="subtitle-1">Users</v-card-title>
    <div v-if="results.data">
      <v-row v-for="i in rowCount" :key="i" justify="end">
        <v-col
          v-for="(result, j) in results.data.slice(calcIndex(i))"
          :key="j"
          sm12
        >
          <MiniProfile :user="results.data[j]"></MiniProfile>
        </v-col>
      </v-row>
    </div>
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
