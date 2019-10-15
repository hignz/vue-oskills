<template>
  <v-form class="mr-12 mt-8" @submit.prevent>
    <v-autocomplete
      v-model="model"
      autocomplete="off"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      hide-selected
      item-text="name"
      item-value="_id"
      label="Search"
      placeholder="Start typing to Search"
      prepend-icon="mdi-magnify"
      return-object
      @change="goToResults"
    ></v-autocomplete>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    items() {
      return this.entries.map(entry => {
        return Object.assign({}, entry);
      });
    }
  },

  watch: {
    search(val) {
      if (val.length === 0) {
        this.entries = [];
      }

      if (this.items.length > 0) return;

      if (this.isLoading) return;

      this.isLoading = true;

      this.$store
        .dispatch('fetchByName', val)
        .then(res => (this.entries = res.data.data))
        .catch(error => console.log(error))
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    goToResults() {
      this.$router.push({
        name: 'profile',
        params: { id: this.model._id, user: this.model }
      });
    }
  }
};
</script>

<style></style>
