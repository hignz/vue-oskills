<template>
  <v-container fluid>
    <p class="subheading grey--text">Results</p>
    <div v-if="results.length">
      <p class="subtitle-2">
        Search results: {{ results.length }} {{ getPlural }} for "{{
          searchTerm
        }}"
      </p>
      <v-row justify="center" dense>
        <v-col v-for="(result, i) in results" :key="i" sm="12" md="3" lg="2">
          <MiniProfile :user="result"></MiniProfile>
        </v-col>
      </v-row>
    </div>
    <v-row v-else-if="!results.length">
      <v-col cols="6">
        <p class="subtitle-2">
          Search results: 0 {{ getPlural }} for "{{ searchTerm }}"
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
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

    this.fetchByName(this.searchTerm)
      .then(response => {
        this.results = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    ...mapActions(['fetchByName'])
  }
};
</script>

<style></style>
