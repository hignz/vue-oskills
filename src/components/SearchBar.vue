<template>
  <v-form class="mt-4" @submit.prevent>
    <v-autocomplete
      v-model="model"
      clearable
      autocomplete="off"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      auto-select-first
      hide-no-data
      hide-selected
      item-text="name"
      item-value="_id"
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      return-object
      @change="navigateTo"
    >
      <template v-slot:item="data">
        <template>
          <v-list-item-avatar>
            <v-icon v-if="data.item.category">mdi-star</v-icon>
            <v-icon v-else>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ data.item.name }}</v-list-item-title>
            <v-list-item-subtitle class="grey--text">
              {{
                data.item.category ? data.item.category.name : data.item.role
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      entries: [],
      isLoading: false,
      model: null,
      search: null
    };
  },

  computed: {
    items() {
      return this.entries.map(entry => {
        return Object.assign({}, entry);
      });
    }
  },

  watch: {
    search(val) {
      if (!val) {
        this.entries = [];
        return;
      }

      if (this.items.length > 0) return;

      if (this.isLoading) return;

      this.isLoading = true;

      this.fetchByName(val)
        .then(res => (this.entries = res.data))
        .catch(error => console.log(error))
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    ...mapActions(['fetchByName']),
    navigateTo() {
      if (this.model) {
        const route = this.model.category
          ? { name: 'skillProfile', params: { id: this.model._id } }
          : {
              name: 'profile',
              params: { id: this.model._id, user: this.model }
            };
        this.$router.push(route);
      }
    }
  }
};
</script>

<style></style>
