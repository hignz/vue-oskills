<template>
  <v-form ref="form" class="mt-7 mr-md-8" @submit.prevent>
    <v-autocomplete
      ref="autocomplete"
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
          <v-img v-if="item.image" :src="item.image"></v-img>
          <v-icon v-else>{{ getIcon(item) }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle class="grey--text">
            {{ getItemSubtitle(item) }}</v-list-item-subtitle
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
      search: null,
      timerId: null
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
    search(val, oldVal) {
      clearTimeout(this._timerId);

      // debounce - delay new calls by 500ms
      this._timerId = setTimeout(() => {
        if (!val || val.trim() === '') {
          this.entries = [];
          return;
        }

        if (val !== oldVal) {
          this.entries = [];
        }

        if (this.items.length > 0 || this.isLoading) return;

        this.isLoading = true;

        this.fetchByName(val)
          .then(res => {
            this.entries = res.data;
          })
          .catch(() => {})
          .finally(() => (this.isLoading = false));
      }, 500);
    }
  },
  methods: {
    ...mapActions(['fetchByName']),
    navigateTo() {
      if (this.model) {
        const route = this.model.category
          ? 'skillProfile'
          : this.model.role
          ? 'profile'
          : 'category';

        this.$router
          .push({ name: route, params: { id: this.model._id } })
          .catch(() => {});

        this.$refs.form.reset();
        this.$refs.autocomplete.blur();
      }
    },
    getIconName(name) {
      if (!name) return undefined;
      return this.$vuetify.icons.values[
        name
          .toLowerCase()
          .replace(/\./g, '')
          .replace(/\s/g, '')
      ];
    },
    getItemSubtitle(item) {
      return item.category
        ? item.category.name
        : item.role
        ? item.role.title
        : item.name;
    },
    getIcon(item) {
      return this.getIconName(item.name)
        ? this.getIconName(item.name)
        : item.category
        ? 'mdi-star'
        : !item.image && !item.category && item.name && !item.role
        ? 'mdi-playlist-star'
        : 'mdi-account';
    }
  }
};
</script>

<style></style>
