<template>
  <v-form @submit.prevent>
    <v-text-field
      v-model="searchTerm"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search"
      :clearable="true"
      @keyup.enter="search()"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    search() {
      this.$router
        .push({
          name: 'results',
          query: {
            search: this.searchTerm
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style></style>
