<template>
  <v-switch v-model="darkMode" label="Dark Mode" color="primary"></v-switch>
</template>

<script>
import vuetify from '../plugins/vuetify';

export default {
  computed: {
    darkMode: {
      get() {
        return this.$store.state.isDark;
      },
      set(value) {
        this.$store.dispatch('toggleDarkMode', value);
      }
    }
  },
  created() {
    this.hex = vuetify.framework.theme.isDark
      ? vuetify.framework.theme.themes.dark.primary
      : vuetify.framework.theme.themes.light.primary;
  }
};
</script>

<style></style>
