<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <div v-if="results.length">
      <p class="subtitle-2">
        Search results: {{ results.length }} {{ getPlural }} for "{{
          searchTerm
        }}"
      </p>
      <v-row justify="start">
        <v-col v-for="(result, i) in results" :key="i" sm="12" md="3">
          <MiniProfile :user="result"></MiniProfile>
        </v-col>
      </v-row>
    </div>
    <v-row v-else-if="!results.length" align="center" justify="center">
      <v-col cols="6">
        <v-card class="text-center"
          >Search results: 0 {{ getPlural }} for "{{ searchTerm }}"</v-card
        >
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
      results: [],
      searchTerm: ''
    };
  },
  computed: {
    getPlural() {
      return this.results.length === 1 ? 'result' : 'results';
    }
  },
  created() {
    this.searchTerm = this.$route.query.search;

    this.$store
      .dispatch('fetchByName', this.searchTerm)
      .then(response => {
        this.results = response.data.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style></style>
