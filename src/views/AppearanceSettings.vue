<template>
  <v-container>
    <p class="subheading grey--text">Appearance</p>
    <v-card class="pt-4 pl-4">
      <v-container>
        <p class="subheading grey--text">Theme</p>
        <v-switch
          v-model="darkMode"
          label="Dark Mode"
          color="primary"
        ></v-switch>
        <p class="subheading grey--text">Accent</p>
        <v-color-picker
          v-model="color"
          mode="hexa"
          :hide-mode-switch="true"
        ></v-color-picker>
      </v-container>
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
