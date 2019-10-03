<template>
  <v-text-field
    v-model="searchTerm"
    prepend-inner-icon="mdi-magnify"
    placeholder="Search"
    :clearable="true"
    @keyup.enter="search()"
  ></v-text-field>
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
      this.$router.push({
        name: 'results',
        query: {
          search: this.searchTerm
        }
      });
    }
  }
};
</script>

<style></style>
