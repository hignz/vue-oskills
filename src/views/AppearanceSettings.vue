<template>
  <v-container>
    <v-card class="pt-4 pl-4">
      <v-card-title>Appearance</v-card-title>
      <v-switch v-model="darkMode" label="Dark Mode" color="primary"></v-switch>
      <v-color-picker
        v-model="color"
        mode="hexa"
        :hide-mode-switch="true"
        :show-swatches="true"
      ></v-color-picker>
    </v-card>
  </v-container>
</template>

<script>
import vuetify from '../plugins/vuetify';

export default {
  name: 'AppearanceSettings',
  data() {
    return {
      type: 'hex',
      hex: '#696969'
    };
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      }
    },
    darkMode: {
      get() {
        return this.$store.state.isDark;
      },
      set(value) {
        this.$store.dispatch('toggleDarkMode', value);
      }
    }
  },
  watch: {
    hex: val => {
      vuetify.framework.theme.themes.dark.primary = val;
      vuetify.framework.theme.themes.light.primary = val;
      localStorage.setItem('accentColor', val);
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
