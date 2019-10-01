<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    @keyup.enter="logName()"
    v-model="searchedName"
    placeholder="Search"
    :clearable="true"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchedName: '',
      results: {}
    };
  },
  methods: {
    logName() {
      //Replace with dispatch to store
      console.log(this.searchedName);

      this.$store
        .dispatch('fetchUsersByName', this.searchedName)
        .then(response => {
          console.log(response);
          this.results = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>