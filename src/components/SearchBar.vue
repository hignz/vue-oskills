<template>
  <v-form ref="form" class="mt-7 mr-md-8" @submit.prevent>
    <v-autocomplete
      v-model="model"
      clearable
      autocomplete="off"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      hide-selected
      item-text="name"
      item-value="_id"
      dense
      outlined
      eager
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      return-object
      @change="navigateTo"
    >
      <template v-slot:item="{ item }">
        <v-list-item-avatar>
          <v-icon v-if="item.category">mdi-star</v-icon>
          <v-img v-else-if="item.image" :src="item.image"></v-img>
          <v-icon v-else>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle class="grey--text">
            {{
              item.category ? item.category.name : item.role.title
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
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
      if (!val || val.trim() === '') {
        this.entries = [];
        return;
      }

      if (this.items.length > 0 || this.isLoading) return;

      this.isLoading = true;

      this.fetchByName(val)
        .then(res => {
          this.entries = res.data;
        })
        .catch(() => {})
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
              params: { id: this.model._id }
            };
        this.$router.push(route);
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style></style>
